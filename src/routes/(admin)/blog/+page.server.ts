import { db } from '$lib/database/db';
import { blogTable } from '$lib/database/schema/blog';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/');
	}
	return { postList: await db.select().from(blogTable) };
};
