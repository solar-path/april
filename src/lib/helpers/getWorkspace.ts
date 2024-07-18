import { db } from '$lib/database/db';
import { workspaceTable } from '$lib/database/schema/entity';
import { workspaceUserTable } from '$lib/database/schema/users';
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

export const getWorkspaceListByAssociatedUser = async (userReference: string) => {
	return await db
		.select({
			userId: workspaceUserTable.userId,
			workspaceId: workspaceUserTable.workspaceId,
			title: workspaceTable.title,
			slug: workspaceTable.slug,
			logo: workspaceTable.logo
		})
		.from(workspaceUserTable)
		.where(eq(workspaceUserTable.userId, userReference))
		.innerJoin(workspaceTable, eq(workspaceUserTable.workspaceId, workspaceTable.id));
};
