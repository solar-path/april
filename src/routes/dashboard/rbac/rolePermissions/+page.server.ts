import type { Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteRolePermissionSchema, rolePermissionSchema } from './rolePermission.schema';

export const actions: Actions = {
	// ROLES
	createRolePermission: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(rolePermissionSchema));
		if (!form.valid) {
			console.log('createRolePermission :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	},
	updateRolePermission: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(rolePermissionSchema));
		if (!form.valid) {
			console.log('updateRolePermission :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	},
	deleteRolePermission: async (event) => {
		const form = await superValidate(
			await event.request.formData(),
			zod(deleteRolePermissionSchema)
		);
		if (!form.valid) {
			console.log('deleteRolePermission :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	}

	// PERMISSIONS

	// ROLES - PERMISIONS

	// USER - ROLES
};
