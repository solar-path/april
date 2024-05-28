import { db } from '$lib/database/db';
import { processTable } from '$lib/database/schema/rcm';
import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';
import type { Item } from '$lib/components/Tree/TreeView.utilities';
import { eq } from 'drizzle-orm';
import { processDeleteSchema, processSchema } from './process.schema';

export const load: PageServerLoad = async () => {
	const processList = await db.select().from(processTable);
	return {
		// PROCESS
		processList,
		processTree: buildTree(processList as Item[]),
		processForm: await superValidate(zod(processSchema))
	};
};

export const actions: Actions = {
	createProcess: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(processSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const id = crypto.randomUUID();
		await db.insert(processTable).values({
			id: id,
			title: form.data.title,
			parentId: form.data.parentId,
			description: form.data.description,
			author: event.locals.user?.id
		});

		return { form };
	},

	deleteProcess: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(processDeleteSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		await db.delete(processTable).where(eq(processTable.id, form.data.id));
		return { form };
	},

	updateProcess: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(processSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		await db
			.update(processTable)
			.set({
				title: form.data.title,
				description: form.data.description,
				parentId: form.data.parentId
			})
			.where(eq(processTable.id, form.data.id));

		return { form };
	}
};
