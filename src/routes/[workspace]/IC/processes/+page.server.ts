import { db } from '$lib/database/db';
import { processTable } from '$lib/database/schema/rcm';
import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';
import type { Item } from '$lib/components/Tree/TreeView.utilities';
import { eq } from 'drizzle-orm';
import { processDeleteSchema, processSchema } from './process.schema';
import { getWorkspaceBySlug } from '$lib/helpers/getWorkspace';

export const load: PageServerLoad = async (event) => {
	const currentWorkspace = await getWorkspaceBySlug(event.params.workspace);

	const processList = currentWorkspace
		? await db.select().from(processTable).where(eq(processTable.workspaceId, currentWorkspace.id))
		: [];

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
		await db.insert(processTable).values({
			id: crypto.randomUUID(),
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
				parentId: form.data.parentId,
				author: event.locals.user?.id || 'unknown'
			})
			.where(eq(processTable.id, form.data.id));

		return { form };
	}
};
