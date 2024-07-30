import { deleteWorkspaceSchema, workspaceSchema } from '$lib/components/Workspace/workspace.schema';
import { db } from '$lib/database/db';
import { workspaceTable } from '$lib/database/schema/entity';
import { workspaceUserTable } from '$lib/database/schema/users';
import { fileProcessor } from '$lib/helpers/fileProcessor';
import { slugify } from '$lib/helpers/slugify';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const actions = {
	createWorkspace: async (event) => {
		if (!event.locals.user?.id) {
			return fail(400, { error: 'User ID is undefined' });
		}

		const form = await superValidate(await event.request.formData(), zod(workspaceSchema));

		if (!form.valid) {
			console.log('/entity/+page.server.ts :: create workspace form is not valid => ', form);
			return fail(400, { form });
		}

		const newWorkspace = await db
			.insert(workspaceTable)
			.values({
				id: crypto.randomUUID(),
				title: form.data.title.trim(),
				logo: form.data.logo instanceof File ? await fileProcessor(form.data.logo, 'logo') : '',
				description: form.data.description ? form.data.description.trim() : '',
				workspace: await slugify(form.data.title.trim()),
				author: event.locals.user?.id
			})
			.returning();

		await db.insert(workspaceUserTable).values({
			id: crypto.randomUUID(),
			workspaceId: newWorkspace[0].id,
			userId: event.locals.user?.id
		});

		return { form };
	},
	updateWorkspace: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(workspaceSchema));

		if (!form.valid) {
			return fail(400, { form });
		} else {
			const record = await db
				.select()
				.from(workspaceTable)
				.where(eq(workspaceTable.id, form.data.id ?? ''));

			await db
				.update(workspaceTable)
				.set({
					title: form.data.title !== record[0].title ? form.data.title : record[0].title,
					description:
						form.data.description !== record[0].description
							? form.data.description
							: record[0].description
				})
				.where(eq(workspaceTable.id, form.data.id ?? ''));
			return { form };
		}
	},
	deleteWorkspace: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(deleteWorkspaceSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		if (form.data.id === undefined) {
			return fail(400, { error: 'Workspace ID is undefined' });
		}
		await db.delete(workspaceTable).where(eq(workspaceTable.id, form.data.id));
		return redirect(302, `/`); // Corrected line
	}
};
