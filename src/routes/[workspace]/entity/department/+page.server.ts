import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteDepartmentSchema, departmentSchema } from './department.schema';
import { departmentTable } from '$lib/database/schema/entity';
import { db } from '$lib/database/db';
import { eq } from 'drizzle-orm';
import { getWorkspaceBySlug } from '$lib/helpers/getWorkspace';

export const actions = {
	// DEPARTMENT CRUD
	createDepartment: async (event) => {
		const currentWorkspace = await getWorkspaceBySlug(event.params.workspace);
		const form = await superValidate(await event.request.formData(), zod(departmentSchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}

		if (currentWorkspace && event.locals.user) {
			await db.insert(departmentTable).values({
				id: crypto.randomUUID(),
				title: form.data.title?.trim() ?? '',
				description: form.data.description?.trim() ?? '',
				companyId: form.data.companyId ?? '',
				author: event.locals.user?.id,
				workspaceId: currentWorkspace.id
			});
		}

		return { form };
	},
	updateDepartment: async (event) => {
		console.log('update department endpoint reached');
		const form = await superValidate(await event.request.formData(), zod(departmentSchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}

		const record = await db
			.select()
			.from(departmentTable)
			.where(eq(departmentTable.id, form.data.id ?? ''));

		if (record.length === 0) {
			return fail(400, { form, error: 'Department not found' });
		}

		await db
			.update(departmentTable)
			.set({
				title: record[0].title !== form.data.title ? form.data.title : record[0].title,
				description:
					record[0].description !== form.data.description
						? form.data.description
						: record[0].description,
				companyId:
					record[0].companyId !== form.data.companyId ? form.data.companyId : record[0].companyId
			})
			.where(eq(departmentTable.id, form.data.id ?? ''));

		return { form };
	},
	deleteDepartment: async (event) => {
		console.log('delete department endpoint reached');
		const form = await superValidate(await event.request.formData(), zod(deleteDepartmentSchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}

		await db.delete(departmentTable).where(eq(departmentTable.id, form.data.id));

		return { form };
	}
};
