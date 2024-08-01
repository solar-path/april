import { db } from '../db';
import { workspaceTable } from '../schema/entity';
import { permissionTable } from '../schema/rbac';

const permissionData = [
	// ENTITY_WORKSPACE
	{
		title: 'Manage workspace',
		permission: 'manage_workspace',
		description: 'Manage workspace: view, create, edit & delete'
	},

	// RBAC_ROLE
	{
		title: 'Manage role',
		permission: 'manage_role',
		description: 'Manage role: view, create, edit & delete'
	},

	// RBAC_PERMISSION
	{
		title: 'Manage permission',
		permission: 'manage_permission',
		description: 'Manage permission: view, create, edit & delete'
	},

	// RBAC_USER_ROLE_MAPPING
	{
		title: 'Assign role(s) to user(s)',
		permission: 'assign_role_to_user',
		description: 'Assign role(s) to user(s): view, create, edit & delete'
	},

	// RBAC_ROLE_PERMISSION_MAPPING
	{
		title: 'Assign permission(s) to role(s)',
		permission: 'assign_permission_to_role',
		description: 'Assign permission(s) to role(s): view, create, edit & delete'
	},
	// ENTITY_REGION
	{
		title: 'Manage region',
		permission: 'manage_region',
		description: 'Manage region: view, create, edit & delete'
	},

	// ENTITY_COMPANY
	{
		title: 'Manage company',
		permission: 'manage_company',
		description: 'Manage company: view, create, edit & delete'
	},

	// ENTITY_DEPARTMENT
	{
		title: 'Manage department',
		permission: 'manage_department',
		description: 'Manage department: view, create, edit & delete'
	},

	// ENTITY_POSITION
	{
		title: 'Manage position',
		permission: 'manage_position',
		description: 'Manage position: view, create, edit & delete'
	},

	// RCM_PROCESS
	{
		title: 'Manage process',
		permission: 'manage_process',
		description: 'Manage process: view, create, edit & delete'
	},

	// RCM_RISK
	{
		title: 'Manage risk',
		permission: 'manage_risk',
		description: 'Manage risk: view, create, edit & delete'
	},

	// RCM_CONTROL
	{
		title: 'Manage control',
		permission: 'manage_control',
		description: 'Manage control: view, create, edit & delete'
	},

	// RCM_MATRIX
	{
		title: 'Manage matrix',
		permission: 'manage_matrix',
		description: 'Manage matrix: view, create, edit & delete'
	}
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
