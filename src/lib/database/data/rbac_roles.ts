import { db } from '../db';
import { roleTable } from '../schema/rbac';

const roleData = [
	{
		title: 'Super Administrator',
		role: 'super_admin',
		description: ''
	},
	{
		title: 'Administrator (Workspace)',
		role: 'workspace_admin',
		description: ''
	},
	{ title: 'Group CEO', description: '' },
	{ title: 'Group CFO', description: '' }
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
