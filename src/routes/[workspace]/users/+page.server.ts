import { db } from '$lib/database/db';
import { userTable, workspaceUserTable } from '$lib/database/schema/users';
import type { PageServerLoad } from './$types';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { inviteUserSchema, removeUserFromWorkspace } from './users.schema';
import { Argon2id } from 'oslo/password';
import {
	sendInviteEmailToExistingNewUser,
	sendInviteEmailToNotExistingNewUser
} from '$lib/email/mail.server';
import { workspaceTable } from '$lib/database/schema/entity';
import { eq } from 'drizzle-orm';
import { getWorkspaceBySlug } from '$lib/helpers/getWorkspace';
import { sql } from 'drizzle-orm';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const currentWorkspace = await getWorkspaceBySlug(event.params.workspace);

	const userWorkspaceList = await db
		.select({
			id: workspaceUserTable.id,
			userId: workspaceUserTable.userId,
			email: userTable.email,
			fullname: sql`${userTable.name} || ' ' || ${userTable.surname}`,
			activated: userTable.activated,
			phone: userTable.phone,
			avatar: userTable.avatar,
			workspaceId: workspaceUserTable.workspaceId,
			workspaceTitle: workspaceTable.title,
			createdAt: workspaceUserTable.createdAt
		})
		.from(workspaceUserTable)
		.innerJoin(userTable, eq(workspaceUserTable.userId, userTable.id))
		.innerJoin(workspaceTable, eq(workspaceUserTable.workspaceId, workspaceTable.id))
		.where(eq(workspaceUserTable.workspaceId, currentWorkspace!.id));

	return {
		userWorkspaceList,
		inviteUserForm: await superValidate(zod(inviteUserSchema))
	};
};

export const actions: Actions = {
	inviteUser: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(inviteUserSchema));

		if (!form.valid) {
			console.log('inviteUser :: invalid form => ', form.data);
			return fail(400, { form });
		}

		const doesUserExist = await db
			.select({ id: userTable.id, token: userTable.token })
			.from(userTable)
			.where(eq(userTable.email, form.data.email.trim().toLowerCase()))
			.limit(1);

		const currentWorkspace = await getWorkspaceBySlug(event.params.workspace);

		if (!currentWorkspace) {
			return setError(form, 'email', 'Invalid workspace');
		}

		if (doesUserExist.length > 0) {
			const userAlreadyInWorkspace = await db
				.select()
				.from(workspaceUserTable)
				.where(eq(workspaceUserTable.userId, doesUserExist[0].id));

			// user already in workspace
			if (userAlreadyInWorkspace.length > 0) {
				return setError(form, 'email', 'User already in workspace');
			}

			// user exists and shall be only invited to workspace
			await db.insert(workspaceUserTable).values({
				id: crypto.randomUUID(),
				userId: doesUserExist[0].id,
				workspaceId: currentWorkspace.id
			});

			// send email notification
			await sendInviteEmailToExistingNewUser(
				form.data.email.trim().toLowerCase(),
				currentWorkspace.title
			);
		} else {
			// user does not exist and shall be invited to workspace
			const token = crypto.randomUUID();
			const newUser = await db
				.insert(userTable)
				.values({
					id: crypto.randomUUID(),
					email: form.data.email.trim().toLowerCase(),
					password: await new Argon2id().hash(token),
					token: token
				})
				.returning({ id: userTable.id });

			await db.insert(workspaceUserTable).values({
				id: crypto.randomUUID(),
				userId: newUser[0].id,
				workspaceId: currentWorkspace.id
			});
			await sendInviteEmailToNotExistingNewUser(
				form.data.email.trim().toLowerCase(),
				token,
				currentWorkspace.title
			);
		}

		return { form };
	},
	removeUserFromWorkspace: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(removeUserFromWorkspace));

		if (!form.valid) {
			console.log('removeUserFromWorkspace :: invalid form => ', form.data);
			return fail(400, { form });
		}

		await db.delete(workspaceUserTable).where(eq(workspaceUserTable.id, form.data.id));

		return { form };
	}
};
