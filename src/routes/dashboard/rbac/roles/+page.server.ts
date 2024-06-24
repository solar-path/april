import type { Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteRoleSchema, roleSchema } from './role.schema';

export const actions: Actions = {
	// ROLES
	createRole: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(roleSchema));
		if (!form.valid) {
			console.log('createRole :: form error => ', form);

			return fail(400, { form });
		}
		return { form };
	},
	updateRole: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(roleSchema));
		if (!form.valid) {
			console.log('updateRole :: form error => ', form);

			return fail(400, { form });
		}
		return { form };
	},
	deleteRole: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(deleteRoleSchema));
		if (!form.valid) {
			console.log('deleteRole :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	}
};
