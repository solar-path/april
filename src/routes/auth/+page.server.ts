import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { lucia } from '$lib/auth/auth';
import { db } from '$lib/database/db';
import { userTable } from '$lib/database/schema/users';
import { eq } from 'drizzle-orm/mysql-core/expressions';
import { loginSchema } from './login/login.schema';
import { sendPasswordResetEmail } from '$lib/email/mail.server';
import { forgotPasswordSchema } from './forgot/forgot.schema';

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const form = await superValidate(await request.formData(), zod(loginSchema));

		// Check if form submitted is valid
		if (!form.valid) {
			return fail(400, { form });
		}

		// Check if user exists
		const existingUser = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, form.data.email));

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

		redirect(302, '/dashboard');
	},

	logout: async (event) => {
		// Check if user is logged in
		if (!event.locals.session) {
			return fail(401);
		}

		// Invalidate session
		await lucia.invalidateSession(event.locals.session.id);

		// Create blank session cookie
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/');
	},
	forgotPassword: async ({ request }) => {
		const form = await superValidate(await request.formData(), zod(forgotPasswordSchema));
		// console.log('/forgot/+page.server.ts :: form => ', form);

		if (!form.valid) {
			return fail(400, { form });
		}

		const token = crypto.randomUUID();

		const existingUser = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, form.data.email));
		console.log('/forgot/+page.server.ts :: existingUser => ', existingUser);

		if (existingUser.length === 0) {
			return setError(form, 'email', 'Invalid credentials');
		}

		if (existingUser.length > 0 && existingUser[0].email === form.data.email) {
			await db.update(userTable).set({ token: token }).where(eq(userTable.email, form.data.email));
			await sendPasswordResetEmail(form.data.email, token);
		}

		if (existingUser[0].activated === false) {
			return setError(form, 'email', 'Account was not verified');
		}
	}
};
