import type { Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deletePermissionSchema, permissionSchema } from './permission.schema';

export const actions: Actions = {
	// ROLES
	createPermission: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(permissionSchema));
		if (!form.valid) {
			console.log('createPermission :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	},
	updatePermission: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(permissionSchema));
		if (!form.valid) {
			console.log('updatePermission :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	},
	deletePermission: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(deletePermissionSchema));
		if (!form.valid) {
			console.log('deletePermission :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	}
};
