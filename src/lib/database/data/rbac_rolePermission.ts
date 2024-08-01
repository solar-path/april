import { db } from '../db';
import { workspaceTable } from '../schema/entity';
import { permissionTable, rolePermissionTable, roleTable } from '../schema/rbac';
import { eq } from 'drizzle-orm';

export const seedRolePermission = async () => {
	const rolePermissionList = await db.select().from(rolePermissionTable);

	if (rolePermissionList.length === 0) {
		const roleList = await db.select().from(roleTable).where(eq(roleTable.role, 'super_admin'));
		const permissionList = await db.select().from(permissionTable);
		const workspaceList = await db.select().from(workspaceTable);
		console.log('start seed RolePermission');

		for (const role of roleList) {
			for (const permission of permissionList) {
				for (const workspace of workspaceList) {
					await db.insert(rolePermissionTable).values({
						id: crypto.randomUUID(),
						roleId: role.id,
						permissionId: permission.id,
						workspaceId: workspace.id,
						level: 'full'
					});
				}
			}
		}
		console.log('RolePermission seed completed ');
	} else {
		console.log('RolePermission already seeded');
	}
};
