import type { Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteUserRoleSchema, userRoleSchema } from './userRole.schema';

export const actions: Actions = {
	// ROLES
	createUserRole: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(userRoleSchema));
		if (!form.valid) {
			console.log('createUserRole :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	},
	updateUserRole: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(userRoleSchema));
		if (!form.valid) {
			console.log('updateUserRole :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	},
	deleteUserRole: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(deleteUserRoleSchema));
		if (!form.valid) {
			console.log('deleteUserRole :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	}
};
