import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { changePasswordSchema } from './changePassword.schema.js';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { db } from '$lib/database/db.js';
import { userTable } from '$lib/database/schema/users';
import { eq } from 'drizzle-orm/mysql-core/expressions';

export const load = async () => {
	const changePasswordForm = await superValidate(zod(changePasswordSchema));
	return { changePasswordForm };
};

export const actions = {
	default: async ({ params, request }) => {
		const token = params.token;
		console.log('forgot/update-[token]/+page.server.ts :: token => ', token);
		const form = await superValidate(await request.formData(), zod(changePasswordSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// find user based on token
		const existingUser = await db.select().from(userTable).where(eq(userTable.token, token));

		if (!existingUser[0]) {
			return setError(form, 'password', 'User not registered');
		}

		if (existingUser[0].activated === false) {
			return setError(form, 'password', 'Account was not verified');
		}

		await db
			.update(userTable)
			.set({ password: await new Argon2id().hash(form.data.password) })
			.where(eq(userTable.token, token));

		redirect(302, '/login');
	}
};
