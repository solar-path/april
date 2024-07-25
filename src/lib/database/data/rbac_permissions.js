import { db } from '../db';
import { permissionTable } from '../schema/rbac';

const permissionData = [
	{ title: 'view_workspace', description: 'View workspace' },
	{ title: 'create_workspace', description: 'Create workspace' },
	{ title: 'update_workspace', description: 'Update workspace' },
	{ title: 'delete_workspace', description: 'Delete workspace' },

	{ title: 'view_region', description: 'View region' },
	{ title: 'create_region', description: 'Create region' },
	{ title: 'update_region', description: 'Update region' },
	{ title: 'delete_region', description: 'Delete region' },

	{ title: 'view_company', description: 'View company' },
	{ title: 'create_company', description: 'Create company' },
	{ title: 'update_company', description: 'Update company' },
	{ title: 'delete_company', description: 'Delete company' },

	{ title: 'view_department', description: 'View department' },
	{ title: 'create_department', description: 'Create department' },
	{ title: 'update_department', description: 'Update department' },
	{ title: 'delete_department' },

	{ title: 'view_position', description: 'View position' },
	{ title: 'create_position', description: 'Create position' },
	{ title: 'update_position', description: 'Update position' },
	{ title: 'delete_position', description: 'Delete position' },

	{ title: 'view_process', description: 'View process' },
	{ title: 'create_process', description: 'Create process' },
	{ title: 'update_process', description: 'Update process' },
	{ title: 'delete_process', description: 'Delete process' },

	{ title: 'view_risk', description: 'View risk' },
	{ title: 'create_risk', description: 'Create risk' },
	{ title: 'update_risk', description: 'Update risk' },
	{ title: 'delete_risk', description: 'Delete risk' },

	{ title: 'view_control', description: 'View control' },
	{ title: 'create_control', description: 'Create control' },
	{ title: 'update_control', description: 'Update control' },
	{ title: 'delete_control', description: 'Delete control' },

	{ title: 'view_matrix', description: 'View matrix' },
	{ title: 'create_matrix', description: 'Create matrix' },
	{ title: 'update_matrix', description: 'Update matrix' },
	{ title: 'delete_matrix', description: 'Delete matrix' }
];

export const seedPermissions = async () => {
	const permissionList = [];
	const permissions = await db.select().from(permissionTable);
	if (permissions.length === 0) {
		console.log('start seed permissions');
		for (const permission of permissionData) {
			const newPermission = await db
				.insert(permissionTable)
				.values({
					id: crypto.randomUUID(),
					title: permission.title,
					description: permission.description
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
