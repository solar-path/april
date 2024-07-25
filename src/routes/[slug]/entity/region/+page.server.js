import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { deleteRegionSchema, regionSchema } from "./region.schema";
import { db } from "$lib/database/db";
import { regionTable } from "$lib/database/schema/entity";
import { eq } from "drizzle-orm";

export const actions = {
    // REGION CRUD
	createRegion: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(regionSchema));

		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}

		await db.insert(regionTable).values({
			id: crypto.randomUUID(),
			title: form.data.title,
			description: form.data.description,
			workspaceId: form.data.workspaceId,
			author: event.locals.user?.id as string
		});

		return { form };
	},
	updateRegion: async (event) => {
		console.log('update region endpoint achived');
		const form = await superValidate(await event.request.formData(), zod(regionSchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}
		const record = await db
			.select()
			.from(regionTable)
			.where(eq(regionTable.id, form.data.id as string));

		await db
			.update(regionTable)
			.set({
				title: form.data.title !== record[0].title ? form.data.title : record[0].title,
				description:
					form.data.description !== record[0].description
						? form.data.description
						: record[0].description,
				workspaceId:
					form.data.workspaceId !== record[0].workspaceId
						? form.data.workspaceId
						: record[0].workspaceId
			})
			.where(eq(regionTable.id, form.data.id as string));

		return { form };
	},
	deleteRegion: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(deleteRegionSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		await db.delete(regionTable).where(eq(regionTable.id, form.data.id as string));
		return { form };
	},
}