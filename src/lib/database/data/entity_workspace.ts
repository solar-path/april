import { slugify } from '$lib/helpers/slugify';
import { db } from '../db';
import { workspaceTable } from '../schema/entity';
import { userTable } from '../schema/users';

const workspaceData = [
	{
		title: 'Aneko Management Group',
		description: 'Aneko Management Group - company that serves the needs of the global market'
	}
];

export const seedWorkspace = async () => {
	const workspaces = await db.select().from(workspaceTable);

	const user = await db.select({ id: userTable.id }).from(userTable).limit(1);
	if (workspaces.length === 0) {
		console.log('start seed workspaces');
		for (const workspace of workspaceData) {
			await db
				.insert(workspaceTable)
				.values({
					id: crypto.randomUUID(),
					title: workspace.title,
					author: user[0].id,
					workspace: await slugify(workspace.title, workspaceTable, workspaceTable.workspace),
					description: workspace.description
				})
				.returning();
		}
		console.log('workspaces seed completed');
	} else {
		console.log('workspaces already seeded');
	}
};
