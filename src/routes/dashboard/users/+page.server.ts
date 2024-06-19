import { db } from '$lib/database/db';
import { userTable } from '$lib/database/schema/users';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { inviteUserSchema } from './users.schema';

export const load: PageServerLoad = async (event) => {
	const userList = await db.select().from(userTable);

	return {
		userList,
		inviteUserForm: await superValidate(zod(inviteUserSchema))
	};
};

export const actions: Actions = {
	inviteUser: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(inviteUserSchema));

		if (form.valid) {
			console.log('inviteUser: form.data => ', form.data);
			return fail(400, { form });
		}
		return { form };
	}
};
