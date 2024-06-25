import type { Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteRolePermissionSchema, rolePermissionSchema } from './rolePermission.schema';
import { db } from '$lib/database/db';
import { rolePermissionTable } from '$lib/database/schema/rbac';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	// ROLES
	createRolePermission: async (event) => {
		console.log('createRolePermission endpoint achieved');
		const form = await superValidate(await event.request.formData(), zod(rolePermissionSchema));
		if (!form.valid) {
			console.log('createRolePermission :: form error => ', form);
			return fail(400, { form });
		}

		await db.insert(rolePermissionTable).values({
			id: crypto.randomUUID(),
			roleId: form.data.roleId,
			permissionId: form.data.permissionId
		});

		return { form };
	},
	updateRolePermission: async (event) => {
		console.log('updateRolePermission endpoint achieved');
		const form = await superValidate(await event.request.formData(), zod(rolePermissionSchema));
		if (!form.valid) {
			console.log('updateRolePermission :: form error => ', form);
			return fail(400, { form });
		}

		return { form };
	},

	deleteRolePermission: async (event) => {
		console.log('deleteRolePermission endpoint achieved');
		const form = await superValidate(
			await event.request.formData(),
			zod(deleteRolePermissionSchema)
		);
		if (!form.valid) {
			console.log('deleteRolePermission :: form error => ', form);
			return fail(400, { form });
		}

		await db.delete(rolePermissionTable).where(eq(rolePermissionTable.id, form.data.id));
		return { form };
	}
};
