import { db } from '$lib/database/db';
import { blogTable } from '$lib/database/schema/blog';
import { eq } from 'drizzle-orm/mysql-core/expressions';
import { and } from 'drizzle-orm';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';

export const load = async () => {
	try {
		const postList = await db
			.select()
			.from(blogTable)
			.where(and(eq(blogTable.status, 'published'), eq(blogTable.readingFor, 'guest')));

		return { postTree: buildTree(postList) };
	} catch (error) {
		console.error('Error loading posts:', error);
		return { postTree: [] };
	}
};
