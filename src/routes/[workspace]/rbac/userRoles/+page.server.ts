import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteUserRoleSchema, userRoleSchema } from './userRole.schema';

export const actions = {
	createUserRole: async (event) => {
		console.log('createUserRole endpoint was achieved');
		const form = await superValidate(await event.request.formData(), zod(userRoleSchema));

		if (!form.valid) {
			console.log('createUserRole :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	},
	updateUserRole: async (event) => {
		console.log('updateUserRole endpoint was achieved');
		const form = await superValidate(await event.request.formData(), zod(userRoleSchema));

		if (!form.valid) {
			console.log('updateUserRole :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	},
	deleteUserRole: async (event) => {
		console.log('createUserRole endpoint was achieved');
		const form = await superValidate(await event.request.formData(), zod(deleteUserRoleSchema));

		if (!form.valid) {
			console.log('deleteUserRole :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	}
};
