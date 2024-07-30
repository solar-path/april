import { db } from '$lib/database/db';
import { userTable } from '$lib/database/schema/users';
import { eq } from 'drizzle-orm';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { inviteRegisterSchema } from './inviteRegister.schema';

export const load = async ({ params }) => {
	const account = await db.select().from(userTable).where(eq(userTable.token, params.token));
	if (!account[0]) {
		return {
			heading: 'Invalid invite letter',
			message: 'The invite letter is invalid or expired',
			inviteRegisterForm: {}
		};
	}

	return {
		heading: '',
		message: '',
		inviteRegisterForm: await superValidate(
			{
				name: account[0].name || '',
				email: account[0].email,
				password: '',
				surname: account[0].surname || '',
				terms: false
			},
			zod(inviteRegisterSchema)
		)
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(inviteRegisterSchema));

		if (!form.valid) {
			console.log('form is invalid => ', form);
			return fail(400, { form });
		}

		await db
			.update(userTable)
			.set({
				name: form.data.name.trim(),
				surname: form.data.surname.trim(),
				password: await new Argon2id().hash(form.data.password),
				activated: true
			})
			.where(eq(userTable.email, form.data.email.trim().toLowerCase()));

		redirect(302, '/login');
	}
};
