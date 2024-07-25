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

/*
 *   Seeds workspace into the database
 *   returns <void>
 */
export const seedWorkspace = async () => {
	const workspaceList = [];
	const workspaces = await db.select().from(workspaceTable);
	const user = await db.select({ id: userTable.id }).from(userTable).limit(1);
	if (workspaces.length === 0) {
		console.log('start seed workspaces');
		for (const workspace of workspaceData) {
			const newWorkspace = await db
				.insert(workspaceTable)
				.values({
					id: crypto.randomUUID(),
					title: workspace.title,
					author: user[0].id,
					slug: await slugify(workspace.title),
					description: workspace.description
				})
				.returning();
			workspaceList.push(newWorkspace[0]);
		}
		console.log('workspaces seed completed');
	} else {
		workspaceList.push(...workspaces);
		console.log('workspaces already seeded');
	}

	return workspaceList;
};
