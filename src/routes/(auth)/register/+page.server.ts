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
	default: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(registerSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const existingUser = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, form.data.email.trim().toLowerCase()))
			.limit(1);

		if (existingUser.length > 0) {
			return setError(form, 'email', 'User already registered');
		}

		const token = crypto.randomUUID();

		const newUser = await db
			.insert(userTable)
			.values({
				id: crypto.randomUUID(),
				email: form.data.email.trim().toLowerCase(),
				password: await new Argon2id().hash(form.data.password),
				token: token,
				name: form.data.name.trim() as string,
				surname: form.data.surname.trim() as string
			})
			.returning({ id: userTable.id });

		if (newUser[0].id) {
			await sendVerificationEmail(form.data.email.trim().toLowerCase(), token);
			return redirect(302, '/auth/login');
		}

		return { form };
	}
};
