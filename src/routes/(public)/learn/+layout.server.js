import { db } from '$lib/database/db';
import { blogTable } from '$lib/database/schema/blog';
import { eq } from 'drizzle-orm/mysql-core/expressions';
import { and } from 'drizzle-orm';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';

export const load = async () => {
	try {
		const data = await db
			.select({
				id: blogTable.id,
				title: blogTable.title,
				parentId: blogTable.parentId
			})
			.from(blogTable)
			.where(and(eq(blogTable.status, 'published'), eq(blogTable.readingFor, 'guest')));

		const postList = data.map((post) => ({ ...post, children: [] }));

		return { postTree: buildTree(postList) };
	} catch (error) {
		console.error('Error loading posts:', error);
		return { postTree: [] };
	}
};
