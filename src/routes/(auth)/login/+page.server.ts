import { redirect, type Actions } from '@sveltejs/kit';
import { loginSchema } from './login.schema';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { userTable } from '$lib/database/schema/users';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
import { lucia } from '$lib/auth/auth';
import { db } from '$lib/database/db';
import { workspaceTable } from '$lib/database/schema/entity';

export const load = async () => {
	return {
		loginForm: await superValidate(zod(loginSchema))
	};
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const form = await superValidate(await request.formData(), zod(loginSchema));

		// Check if form submitted is valid
		if (!form.valid) {
			return fail(400, { form });
		}

		// Check if user exists
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

		console.log('login/+page.server.ts :: existingUser => ', existingUser);
		// If user does not exist, return error
		if (!existingUser[0]) {
			return setError(form, 'email', 'User not registered');
		}

		// If user does not have a verified account, return error
		if (existingUser[0].activated === false) {
			return setError(form, 'email', 'Account was not verified');
		}

		// compare password
		const validPassword = await new Argon2id().verify(existingUser[0].password, form.data.password);

		// If password is invalid, return error
		if (!validPassword) {
			return setError(form, 'email', 'Invalid credentials');
		}

		// Create session
		const session = await lucia.createSession(existingUser[0].id, {});

		// Create session cookie
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, `/${existingUser[0].workspace}`);
	}
};
