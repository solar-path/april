import { redirect } from '@sveltejs/kit';
import { loginSchema } from './login.schema';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { userTable, workspaceUserTable } from '$lib/database/schema/users';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
import { lucia } from '$lib/auth/auth';
import { db } from '$lib/database/db';
import { workspaceTable } from '$lib/database/schema/entity';

/**
 * @description Loads the login page
 * @returns loginForm
 */
export const load = async () => {
	return {
		loginForm: await superValidate(zod(loginSchema))
	};
};

/**
 * @description Handles the login form submission
 * @param {Object} cookies - The cookies object
 * @param {Object} request - The request object
 * 1. check if form is valid else return fail 400
 * 2. check if user exists - if not return error
 * 3. check if user account is activated - if not return error
 * 4. check if user password is valid - if not return error
 * 5. get user association with a workspace
 * 6. create session
 * 7. create session cookie
 * 8. redirect to workspace
 * @returns {string | url } - errors if checks 1-4 fails, path to be redirected if checks 1-4 passes
 */
export const actions = {
	default: async ({ cookies, request }) => {
		const form = await superValidate(await request.formData(), zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const existingUser = await db
			.select({
				id: userTable.id,
				email: userTable.email,
				password: userTable.password,
				activated: userTable.activated,
				workspace: workspaceTable.slug
			})
			.from(userTable)
			.where(eq(userTable.email, form.data.email))
			.leftJoin(workspaceTable, eq(workspaceTable.author, userTable.id));

		if (!existingUser[0] || existingUser.length === 0) {
			return setError(form, 'email', 'User not registered');
		}

		if (existingUser[0].activated === false) {
			return setError(form, 'email', 'Account was not verified');
		}

		/** @type {boolean} */
		const validPassword = await new Argon2id().verify(existingUser[0].password, form.data.password);

		if (!validPassword) {
			return setError(form, 'email', 'Invalid credentials');
		}

		const userWorkspace = await db
			.select({
				workspaceId: workspaceUserTable.workspaceId,
				slug: workspaceTable.slug
			})
			.from(workspaceUserTable)
			.leftJoin(workspaceTable, eq(workspaceTable.id, workspaceUserTable.workspaceId))
			.where(eq(workspaceUserTable.userId, existingUser[0].id));

		const session = await lucia.createSession(existingUser[0].id, {});

		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, `/${userWorkspace[0].slug}`);
	}
};
