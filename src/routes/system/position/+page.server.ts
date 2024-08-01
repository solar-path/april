import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import {
	deletePositionSchema,
	positionSchema
} from '../../../lib/components/entity/Position/position.schema';
import { db } from '$lib/database/db';
import { positionTable } from '$lib/database/schema/entity';
import { eq } from 'drizzle-orm';
import { getWorkspaceBySlug } from '$lib/helpers/getWorkspace';

// POSITION CRUD
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	/**
	 * @description - Create a position
	 * @param event
	 * @returns
	 */
	createPosition: async (event) => {
		console.log('create position endpoint reached');

		const currentWorkspace = await getWorkspaceBySlug(event.params.workspace);
		const form = await superValidate(await event.request.formData(), zod(positionSchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}

		if (currentWorkspace && event.locals.user) {
			await db.insert(positionTable).values({
				id: crypto.randomUUID(),
				title: form.data.title,
				description: form.data.description,
				departmentId: form.data.departmentId,
				companyId: form.data.companyId,
				author: event.locals.user?.id,
				workspaceId: currentWorkspace.id
			});
		}

		return { form };
	},
	/**
	 * @description - Update a position
	 * @param event
	 * @returns
	 */
	updatePosition: async (event) => {
		console.log('update position endpoint reached');
		const form = await superValidate(await event.request.formData(), zod(positionSchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}
		const record = await db
			.select()
			.from(positionTable)
			.where(eq(positionTable.id, form.data.id ?? ''));

		await db
			.update(positionTable)
			.set({
				title: record[0].title !== form.data.title ? form.data.title : record[0].title,
				description:
					record[0].description !== form.data.description
						? form.data.description
						: record[0].description,
				departmentId:
					record[0].departmentId !== form.data.departmentId
						? form.data.departmentId
						: record[0].departmentId,
				companyId:
					record[0].companyId !== form.data.companyId ? form.data.companyId : record[0].companyId
			})
			.where(eq(positionTable.id, form.data.id ?? ''));
		return { form };
	},
	/**
	 * @description - Delete a position
	 * @param event
	 * @returns
	 */
	deletePosition: async (event) => {
		console.log('delete position endpoint reached');
		const form = await superValidate(await event.request.formData(), zod(deletePositionSchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}

		const record = await db.select().from(positionTable).where(eq(positionTable.id, form.data.id));

		if (record.length === 0) {
			return fail(400, { form, error: 'Position not found' });
		}

		await db.delete(positionTable).where(eq(positionTable.id, form.data.id));
		return { form };
	}
};
