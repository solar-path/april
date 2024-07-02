import { db } from '$lib/database/db';
import { userTable, workspaceUserTable } from '$lib/database/schema/users';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { inviteUserSchema } from './users.schema';
import { Argon2id } from 'oslo/password';
import { sendInviteEmail } from '$lib/email/mail.server';
import { workspaceTable } from '$lib/database/schema/entity';
import { eq } from 'drizzle-orm';
import { getWorkspaceBySlug } from '$lib/helpers/getWorkspace';
import { sql } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	const currentWorkspace = await getWorkspaceBySlug(event.params.slug);

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
		.where(eq(workspaceUserTable.workspaceId, currentWorkspace));

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

		const user = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, form.data.email.trim().toLowerCase()));

		if (user.length > 0) {
			return setError(form, 'email', 'User already registered');
		}

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

		console.log('/dashboard/users :: newUser => ', newUser);

		const workspace = await db
			.select({
				id: workspaceTable.id,
				title: workspaceTable.title
			})
			.from(workspaceTable)
			.where(eq(workspaceTable.author, event.locals.user?.id || ''));

		if (newUser[0].id && workspace.length > 0) {
			await sendInviteEmail(form.data.email.trim().toLowerCase(), token, workspace[0].title);
		}

		return { form };
	}
};
