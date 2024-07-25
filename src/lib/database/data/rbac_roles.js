import { db } from '../db';
import { roleTable } from '../schema/rbac';

const roleData = [
	{
		title: 'Super Admin',
		description: 'Super admin has full access to all resources and features'
	},
	{
		title: 'Workspace admin',
		description: 'Workspace admin has access to all resources and features in the workspace'
	},
	{
		title: 'Region admin',
		description: 'Region admin has access to all resources and features in the region'
	},
	{
		title: 'Company admin',
		description: 'Company admin has access to all resources and features in the company'
	},
	{
		title: 'Department admin',
		description: 'Department admin has access to all resources and features in the department'
	},
	{
		title: 'Position admin',
		description: 'Position admin has access to all resources and features in the position'
	},
	{
		title: 'Head of internal control',
		description:
			'Head of internal control has access to all resources and features in the head of internal control'
	},
	{
		title: 'Internal control manager',
		description:
			'Internal control manager has access to all resources and features in the internal control manager'
	},
	{
		title: 'Process owner',
		description: 'Process owner has access to all resources and features in the process owner'
	},
	{
		title: 'Control owner',
		description: 'Control owner has access to all resources and features in the control owner'
	},
	{
		title: 'Risk owner',
		description: 'Risk owner has access to all resources and features in the risk owner'
	},
	{
		title: 'User',
		description: 'User has access to all resources and features in the user'
	}
];

export const seedRoles = async () => {
	const roles = await db.select().from(roleTable);
	const roleList = [];
	if (roles.length === 0) {
		console.log('start seed roles');
		for (const role of roleData) {
			const newRole = await db
				.insert(roleTable)
				.values({
					id: crypto.randomUUID(),
					title: role.title,
					description: role.description
				})
				.returning();
			roleList.push(newRole[0]);
		}
		console.log('roles seed completed');
	} else {
		roleList.push(...roles);
		console.log('roles already seeded');
	}
};
