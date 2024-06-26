import { db } from '$lib/database/db';
import {
	permissionTable,
	rolePermissionTable,
	roleTable,
	userRoleTable
} from '$lib/database/schema/rbac';
import { userTable } from '$lib/database/schema/users';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { roleSchema } from './roles/role.schema';
import { permissionSchema } from './permissions/permission.schema';
import { rolePermissionSchema } from './rolePermissions/rolePermission.schema';
import { userRoleSchema } from './userRoles/userRole.schema';
import { eq } from 'drizzle-orm';

export const load = async () => {
	return {
		// permissions
		permissionList: await db.select().from(permissionTable),
		permissionForm: await superValidate(zod(permissionSchema)),
		// roles
		roleList: await db.select().from(roleTable),
		roleForm: await superValidate(zod(roleSchema)),
		// users
		userList: await db.select().from(userTable),

		// user roles
		userRoleList: await db.select().from(userRoleTable),
		userRoleForm: await superValidate(zod(userRoleSchema)),
		// role permissions
		rolePermissionList: await db
			.select({
				id: rolePermissionTable.id,
				roleId: rolePermissionTable.roleId,
				role: roleTable.title,
				permissionId: rolePermissionTable.permissionId,
				permission: permissionTable.title
			})
			.from(rolePermissionTable)
			.innerJoin(roleTable, eq(rolePermissionTable.roleId, roleTable.id))
			.innerJoin(permissionTable, eq(rolePermissionTable.permissionId, permissionTable.id)),
		rolePermissionForm: await superValidate(zod(rolePermissionSchema))
	};
};
