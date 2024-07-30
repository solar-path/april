import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deletePermissionSchema, permissionSchema } from './permission.schema';
import { permissionTable } from '$lib/database/schema/rbac';
import { db } from '$lib/database/db';
import { eq } from 'drizzle-orm';

export const actions = {
	// ROLES
	createPermission: async (event) => {
		console.log('createPermission endpoint was achieved');
		const form = await superValidate(await event.request.formData(), zod(permissionSchema));
		if (!form.valid) {
			console.log('createPermission :: form error => ', form);
			return fail(400, { form });
		}

		await db.insert(permissionTable).values({
			id: crypto.randomUUID(),
			title: form.data.title,
			description: form.data.description
		});

		return { form };
	},
	updatePermission: async (event) => {
		console.log('updatePermission endpoint was achieved');
		const form = await superValidate(await event.request.formData(), zod(permissionSchema));
		if (!form.valid || form.data.id === undefined) {
			console.log('updatePermission :: form error => ', form);
			return fail(400, { form });
		}

		const permission = await db
			.select()
			.from(permissionTable)
			.where(eq(permissionTable.id, form.data.id));

		if (permission.length === 0) {
			return fail(404, { form });
		}

		await db
			.update(permissionTable)
			.set({
				title: permission[0].title === form.data.title ? permission[0].title : form.data.title,
				description:
					permission[0].description === form.data.description
						? permission[0].description
						: form.data.description
			})
			.where(eq(permissionTable.id, form.data.id));

		return { form };
	},
	deletePermission: async (event) => {
		console.log('deletePermission endpoint was achieved');
		const form = await superValidate(await event.request.formData(), zod(deletePermissionSchema));
		if (!form.valid) {
			console.log('deletePermission :: form error => ', form);
			return fail(400, { form });
		}

		await db.delete(permissionTable).where(eq(permissionTable.id, form.data.id));
		return { form };
	}
};
