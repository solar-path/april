import { db } from '../db';
import { workspaceTable } from '../schema/entity';
import { userTable, workspaceUserTable } from '../schema/users';

export const seedWorkspaceUser = async () => {
	const workspaceUser = await db.select({ id: workspaceUserTable.id }).from(workspaceUserTable);
	const user = await db.select({ id: userTable.id }).from(userTable).limit(1);
	const workspace = await db.select({ id: workspaceTable.id }).from(workspaceTable).limit(1);

	if (workspaceUser.length === 0) {
		console.log('start seed workspaceUser');
		await db.insert(workspaceUserTable).values({
			id: crypto.randomUUID(),
			userId: user[0].id,
			workspaceId: workspace[0].id
		});
		console.log('workspaceUser created');
	} else {
		console.log('workspaceUser already exists');
	}
};
