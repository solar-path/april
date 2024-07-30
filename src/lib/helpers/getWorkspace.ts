import { db } from '$lib/database/db';
import { workspaceTable } from '$lib/database/schema/entity';
import { workspaceUserTable } from '$lib/database/schema/users';
import { eq } from 'drizzle-orm';

export const getWorkspaceList = async (userReference: string) => {
	return await db.select().from(workspaceTable).where(eq(workspaceTable.author, userReference));
};

export const getWorkspaceBySlug = async (workspaceTitle: string | undefined) => {
	if (workspaceTitle === undefined) {
		return null;
	} else {
		const workspace = await db
			// .select({ id: workspaceTable.id, title: workspaceTable.title })
			.select()
			.from(workspaceTable)
			.where(eq(workspaceTable.workspace, workspaceTitle))
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
			workspace: workspaceTable.workspace,
			logo: workspaceTable.logo
		})
		.from(workspaceUserTable)
		.where(eq(workspaceUserTable.userId, userReference))
		.innerJoin(workspaceTable, eq(workspaceUserTable.workspaceId, workspaceTable.id));
};
