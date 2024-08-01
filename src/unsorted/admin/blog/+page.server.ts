import { db } from '$lib/database/db';
import { blogTable } from '$lib/database/schema/blog';
import type { Actions, PageServerLoad } from './$types';
import { withFiles, fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { postDeleteSchema, postSchema } from './post.schema';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';
import { fileProcessor } from '$lib/helpers/fileProcessor';

export const load: PageServerLoad = async () => {
	const postList = await db.select().from(blogTable);

	return {
		postList,
		postTree: buildTree(postList),
		postForm: await superValidate(zod(postSchema))
	};
};

export const actions: Actions = {
	createPost: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(postSchema));
		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}
		// console.log('blog/+page.server.ts :: form => ', form);

		await db.insert(blogTable).values({
			id: crypto.randomUUID(),
			title: form.data.title,
			content: form.data.content,
			status: form.data.status,
			parentId: form.data.parentId,
			readingFor: form.data.readingFor,
			// coverImage: form.data.coverImage,
			coverImage:
				form.data.coverImage instanceof File
					? await fileProcessor(form.data.coverImage, 'blog')
					: '',
			authorId: event.locals.user?.id
		});

		return withFiles({ form });
	},
	updatePost: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(postSchema));
		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		console.log('blog/+page.server.ts :: form => ', form);
		return withFiles({ form });
	},
	deletePost: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(postDeleteSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		console.log('blog/+page.server.ts :: form => ', form);
		// await db.delete(controlTable).where(eq(controlTable.code, form.data.code));

		return { form };
	}
};
