import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { entityDeleteSchema, entitySchema } from '$lib/Entity/Validation/entity.schema';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/database/db';
import { entityTable } from '$lib/database/schema/entity';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/login');
	}

	const entityList = await db.select().from(entityTable);

	return {
		entityList,
		entityTree: buildTree(entityList),
		entityForm: await superValidate(zod(entitySchema))
	};
};

export const actions: Actions = {
	createUnit: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(entitySchema));
		// Convenient validation check:
		if (!form.valid) {
			return fail(400, { form });
		}

		await db.insert(entityTable).values({
			id: crypto.randomUUID(),
			title: form.data.title,
			parentId: form.data.parentId,
			author: event.locals.user?.id
		});

		return { form };
	},
	updateUnit: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(entitySchema));
		// const form = await superValidate(await request.formData(), zod(entitySchema));

		// Convenient validation check:
		if (!form.valid) {
			return fail(400, { form });
		}
		await db
			.update(entityTable)
			.set({
				title: form.data.title,
				parentId: form.data.parentId,
				type: form.data.type
			})
			.where(eq(entityTable.id, form.data.id));

		return { form };
	},
	deleteUnit: async (event) => {
		console.log('/dashboard/structure/+page.server.ts :: deleteUnit method reached');
		const form = await superValidate(await event.request.formData(), zod(entityDeleteSchema));
		console.log('/dashboard/structure/+page.server.ts :: form => ', form);

		if (!form.valid) {
			return fail(400, { form });
		}
		await db.delete(entityTable).where(eq(entityTable.id, form.data.id));
		return { form };
	}
};
