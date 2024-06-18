import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { forgotPasswordSchema } from './forgot.schema';
import type { Actions } from '@sveltejs/kit';
import { userTable } from '$lib/database/schema/users';
import { sendPasswordResetEmail } from '$lib/email/mail.server';
import { db } from '$lib/database/db';
import { eq } from 'drizzle-orm';

export const load = async () => {
	return {
		forgotPasswordForm: await superValidate(zod(forgotPasswordSchema))
	};
};
export const actions: Actions = {
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
