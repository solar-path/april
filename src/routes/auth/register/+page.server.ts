import { registerSchema } from './register.schema';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';
import { db } from '$lib/database/db';
import { userTable } from '$lib/database/schema/users';
import { eq } from 'drizzle-orm/mysql-core/expressions';
import { Argon2id } from 'oslo/password';
import { sendVerificationEmail } from '$lib/email/mail.server';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	return {
		registerForm: await superValidate(zod(registerSchema))
	};
};

export const actions: Actions = {
	register: async (event) => {
		// Check if form submitted is valid
		const form = await superValidate(await event.request.formData(), zod(registerSchema));

		// validate form
		if (!form.valid) {
			return fail(400, { form });
		}

		// Check if user exists
		const existingUser = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, form.data.email));

		// If user exists, return error
		if (existingUser[0]) {
			return setError(form, 'email', 'User already registered');
		}

		// Create token
		const token = crypto.randomUUID();

		// Insert new user
		const newUser = await db.insert(userTable).values({
			id: crypto.randomUUID(),
			email: form.data.email.toLowerCase(),
			password: await new Argon2id().hash(form.data.password),
			token: token
		});

		// If user is created, send verification email
		if (newUser[0]) {
			await sendVerificationEmail(form.data.email.toLowerCase(), token);
			redirect(302, '/login');
		} else {
			return setError(form, 'email', 'Something gone wrong');
		}
	}
};
