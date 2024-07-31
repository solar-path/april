import { db } from '../db';
import { workspaceTable } from '../schema/entity';
import { permissionTable } from '../schema/rbac';

const permissionData = [
	// WORKSPACE
	{ title: 'View workspace', permission: 'view_workspace', description: 'View workspace' },
	{ title: 'Create workspace', permission: 'create_workspace', description: 'Create workspace' },
	{ title: 'Update workspace', permission: 'update_workspace', description: 'Update workspace' },
	{ title: 'Delete workspace', permission: 'delete_workspace', description: 'Delete workspace' },

	//RBAC_ROLE
	{ title: 'View role', permission: 'view_role', description: 'View role' },
	{ title: 'Create role', permission: 'create_role', description: 'Create role' },
	{ title: 'Update role', permission: 'update_role', description: 'Update role' },
	{ title: 'Delete role', permission: 'delete_role', description: 'Delete role' },

	//RBAC_PERMISSION
	{ title: 'View permission', permission: 'view_permission', description: 'View permission' },
	{ title: 'Create permission', permission: 'create_permission', description: 'Create permission' },
	{ title: 'Update permission', permission: 'update_permission', description: 'Update permission' },
	{ title: 'Delete permission', permission: 'delete_permission', description: 'Delete permission' },

	//RBAC_USER_ROLE_MAPPING
	{
		title: 'View user role mapping',
		permission: 'view_user_role_mapping',
		description: 'Review user role mapping'
	},
	{
		title: 'Create user role mapping',
		permission: 'create_user_role_mapping',
		description: 'Create user role mapping'
	},
	{
		title: 'Update user role mapping',
		permission: 'update_user_role_mapping',
		description: 'Update user role mapping'
	},
	{
		title: 'Delete user role mapping',
		permission: 'delete_user_role_mapping',
		description: 'Delete user role mapping'
	},
	//RBAC_ROLE_PERMISSION_MAPPING
	{
		title: 'View role permission mapping',
		permission: 'view_role_permission_mapping',
		description: 'View role permission mapping'
	},
	{
		title: 'Create role permission mapping',
		permission: 'create_role_permission_mapping',
		description: 'Create role permission mapping'
	},
	{
		title: 'Update role permission mapping',
		permission: 'update_role_permission_mapping',
		description: 'Update role permission mapping'
	},
	{
		title: 'Delete role permission mapping',
		permission: 'delete_role_permission_mapping',
		description: 'Delete role permission mapping'
	},

	// REGION
	{ title: 'view_region', description: 'View region' },
	{ title: 'create_region', description: 'Create region' },
	{ title: 'update_region', description: 'Update region' },
	{ title: 'delete_region', description: 'Delete region' },

	// COMPANY
	{ title: 'view_company', description: 'View company' },
	{ title: 'create_company', description: 'Create company' },
	{ title: 'update_company', description: 'Update company' },
	{ title: 'delete_company', description: 'Delete company' },

	// DEPARTMENT
	{ title: 'view_department', description: 'View department' },
	{ title: 'create_department', description: 'Create department' },
	{ title: 'update_department', description: 'Update department' },
	{ title: 'delete_department' },

	// POSITION
	{ title: 'view_position', description: 'View position' },
	{ title: 'create_position', description: 'Create position' },
	{ title: 'update_position', description: 'Update position' },
	{ title: 'delete_position', description: 'Delete position' },

	// PROCESS
	{ title: 'view_process', description: 'View process' },
	{ title: 'create_process', description: 'Create process' },
	{ title: 'update_process', description: 'Update process' },
	{ title: 'delete_process', description: 'Delete process' },

	// RISK
	{ title: 'view_risk', description: 'View risk' },
	{ title: 'create_risk', description: 'Create risk' },
	{ title: 'update_risk', description: 'Update risk' },
	{ title: 'delete_risk', description: 'Delete risk' },

	// CONTROL
	{ title: 'view_control', description: 'View control' },
	{ title: 'create_control', description: 'Create control' },
	{ title: 'update_control', description: 'Update control' },
	{ title: 'delete_control', description: 'Delete control' },

	// MATRIX
	{ title: 'view_matrix', description: 'View matrix' },
	{ title: 'create_matrix', description: 'Create matrix' },
	{ title: 'update_matrix', description: 'Update matrix' },
	{ title: 'delete_matrix', description: 'Delete matrix' }
];

export const seedPermissions = async () => {
	const permissionList = [];
	const permissions = await db.select().from(permissionTable);

	const workspace = await db.select().from(workspaceTable).limit(1);
	if (permissions.length === 0) {
		console.log('start seed permissions');
		for (const permission of permissionData) {
			const newPermission = await db
				.insert(permissionTable)
				.values({
					id: crypto.randomUUID(),
					title: permission.title,
					permission: permission.title, // Added the missing 'permission' property
					description: permission.description,
					workspaceId: workspace[0].id
				})
				.returning();
			permissionList.push(newPermission[0]);
		}
		console.log('permissions seed completed');
	} else {
		permissionList.push(...permissions);
		console.log('permissions already seeded');
	}
	return permissionList;
};
