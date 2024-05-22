import { db } from '$lib/database/db';
import { blogTable } from '$lib/database/schema/blog';
import type { Actions, PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { postDeleteSchema, postSchema } from './post.schema';

export const load: PageServerLoad = async (event) => {
	return { postList: await db.select().from(blogTable) };
};

export const actions: Actions = {
	createPost: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(postSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		console.log('blog/+page.server.ts :: form => ', form);
		return { form };
	},
	updatePost: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(postSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		console.log('blog/+page.server.ts :: form => ', form);
		return { form };
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
