import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteRoleSchema, roleSchema } from './role.schema';
import { roleTable } from '$lib/database/schema/rbac';
import { db } from '$lib/database/db';
import { eq } from 'drizzle-orm';

export const actions = {
	// ROLES
	createRole: async (event) => {
		console.log('createRole endpoint was achieved');
		const form = await superValidate(await event.request.formData(), zod(roleSchema));
		if (!form.valid) {
			console.log('createRole :: form error => ', form);

			return fail(400, { form });
		}

		await db.insert(roleTable).values({
			id: crypto.randomUUID(),
			title: form.data.title.trim(),
			description: form.data.description?.trim()
		});

		return { form };
	},
	updateRole: async (event) => {
		console.log('updateRole endpoint was achieved');
		const form = await superValidate(await event.request.formData(), zod(roleSchema));

		if (!form.valid || form.data.id === undefined) {
			console.log('updateRole :: form error => ', form);
			return fail(400, { form });
		}

		const role = await db.select().from(roleTable).where(eq(roleTable.id, form.data.id));

		if (role.length === 0) {
			return fail(404, { form });
		}

		await db
			.update(roleTable)
			.set({
				title: role[0].title === form.data.title ? role[0].title : form.data.title,
				description:
					role[0].description === form.data.description
						? role[0].description
						: form.data.description
			})
			.where(eq(roleTable.id, form.data.id));

		return { form };
	},

	deleteRole: async (event) => {
		console.log('createRole endpoint was achieved');
		const form = await superValidate(await event.request.formData(), zod(deleteRoleSchema));
		if (!form.valid) {
			console.log('deleteRole :: form error => ', form);
			return fail(400, { form });
		}

		await db.delete(roleTable).where(eq(roleTable.id, form.data.id));

		return { form };
	}
};
