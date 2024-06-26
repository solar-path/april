import { db } from '$lib/database/db';
import { workspaceTable } from '$lib/database/schema/entity';
import { eq } from 'drizzle-orm';

export const getWorkspaceList = async (userReference: string) => {
	return await db.select().from(workspaceTable).where(eq(workspaceTable.author, userReference));
};
