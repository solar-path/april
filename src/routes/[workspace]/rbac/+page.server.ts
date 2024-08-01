import { db } from '$lib/database/db';
import {
	permissionTable,
	rolePermissionTable,
	roleTable,
	userRoleTable
} from '$lib/database/schema/rbac';
import { userTable, workspaceUserTable } from '$lib/database/schema/users';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { roleSchema } from './roles/role.schema';
import { permissionSchema } from './permissions/permission.schema';
import { rolePermissionSchema } from './rolePermissions/rolePermission.schema';
import { userRoleSchema } from './userRoles/userRole.schema';
import { eq } from 'drizzle-orm';
import { getWorkspaceBySlug } from '$lib/helpers/getWorkspace';

export const load = async (event) => {
	const currentWorkspace = await getWorkspaceBySlug(event.params.workspace);

	return {
		// permissions
		permissionList: currentWorkspace
			? await db
					.select()
					.from(permissionTable)
					.where(eq(permissionTable.workspaceId, currentWorkspace.id))
			: [],

		permissionForm: await superValidate(zod(permissionSchema)),

		// roles
		roleList: currentWorkspace
			? await db.select().from(roleTable).where(eq(roleTable.workspaceId, currentWorkspace.id))
			: [],
		roleForm: await superValidate(zod(roleSchema)),
		// users
		userList: currentWorkspace
			? await db
					.select()
					.from(workspaceUserTable)
					.where(eq(workspaceUserTable.workspaceId, currentWorkspace.id))
			: [],

		// user roles
		userRoleList: currentWorkspace
			? await db
					.select()
					.from(userRoleTable)
					.where(eq(userRoleTable.workspaceId, currentWorkspace.id))
			: [],
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
