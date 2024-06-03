import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { blogTable } from '$lib/database/schema/blog';
import { eq } from 'drizzle-orm/mysql-core/expressions';
import { db } from '$lib/database/db';
import { userTable } from '$lib/database/schema/users';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const post = await db
			.select({
				id: blogTable.id,
				title: blogTable.title,
				content: blogTable.content,
				coverImage: blogTable.coverImage,
				parentId: blogTable.parentId,
				userEmail: userTable.email,
				status: blogTable.status,
				readingFor: blogTable.readingFor,
				createdAt: blogTable.createdAt,
				updatedAt: blogTable.updatedAt
			})
			.from(blogTable)
			.where(eq(blogTable.id, params.id))
			.leftJoin(userTable, eq(blogTable.author, userTable.id)); // Hypothetical join operation

		// console.log("/learn/[id]/+page.server.ts :: post => ", post)

		if (!post) {
			throw error(404, 'Post not found');
		}
		return { post: post[0] };
	} catch (error) {
		console.log(error);
		return { post: null };
	}
};
