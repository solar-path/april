import { db } from '$lib/database/db';
import { workspaceTable } from '$lib/database/schema/entity';
import { eq } from 'drizzle-orm';

export const getWorkspaceList = async (userReference: string) => {
	return await db.select().from(workspaceTable).where(eq(workspaceTable.author, userReference));
};

export const getWorkspaceBySlug = async (slug: string | undefined) => {
	if (slug === undefined) {
		return null;
	} else {
		const workspace = await db
			// .select({ id: workspaceTable.id, title: workspaceTable.title })
			.select()
			.from(workspaceTable)
			.where(eq(workspaceTable.slug, slug))
			.limit(1);

		return workspace[0];
	}
};
