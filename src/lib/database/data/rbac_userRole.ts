import { db } from '../db';
import { workspaceTable } from '../schema/entity';
import { roleTable, userRoleTable } from '../schema/rbac';
import { userTable } from '../schema/users';
import { eq } from 'drizzle-orm';

export const seedUserRole = async () => {
	const userList = await db
		.select()
		.from(userTable)
		.where(eq(userTable.email, 'itgroup.luck@gmail.com'));

	const roleList = await db.select().from(roleTable).where(eq(roleTable.role, 'super_admin'));

	const workspaceList = await db.select().from(workspaceTable);

	const userRoleList = await db.select().from(userRoleTable);

	if (userRoleList.length === 0) {
		console.log('start seed UserRole');
		for (const role of roleList) {
			for (const workspace of workspaceList) {
				await db.insert(userRoleTable).values({
					id: crypto.randomUUID(),
					userId: userList[0].id,
					roleId: role.id,
					workspaceId: workspace.id
				});
			}
		}

		console.log('UserRole seed completed');
	} else {
		console.log('UserRole already seeded');
	}
};
