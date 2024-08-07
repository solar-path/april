import { db } from '$lib/database/db';
import { controlTable } from '$lib/database/schema/rcm';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { controlDeleteSchema, controlSchema } from './control.schema';
import { eq } from 'drizzle-orm';
import { getWorkspaceBySlug } from '$lib/helpers/getWorkspace';

export const load = async (event) => {
	const currentWorkspace = await getWorkspaceBySlug(event.params.workspace);
	return {
		// CONTROL
		controlList: currentWorkspace
			? await db
					.select()
					.from(controlTable)
					.where(eq(controlTable.workspaceId, currentWorkspace.id))
			: [],
		controlForm: await superValidate(zod(controlSchema))
	};
};

export const actions = {
	createControl: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(controlSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		await db.insert(controlTable).values({
			id: crypto.randomUUID(),
			title: form.data.title,
			description: form.data.description,
			author: event.locals.user?.id || ''
		});

		return { form };
	},
	deleteControl: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(controlDeleteSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		await db.delete(controlTable).where(eq(controlTable.id, form.data.id));
		return { form };
	},
	updateControl: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(controlSchema));
		if (!form.valid || form.data.id === undefined) {
			return fail(400, { form });
		}
		const control = await db.select().from(controlTable).where(eq(controlTable.id, form.data.id));

		if (control.length === 0 || !control) {
			return fail(400, { form });
		}
		await db
			.update(controlTable)
			.set({
				title: form.data.title,
				description: form.data.description,
				author: event.locals.user?.id || ''
			})
			.where(eq(controlTable.id, form.data.id));

		return { form };
	}
};
