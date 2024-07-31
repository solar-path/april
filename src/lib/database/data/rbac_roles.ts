import { db } from '../db';
import { workspaceTable } from '../schema/entity';
import { roleTable } from '../schema/rbac';

const roleData = [
	// ADMINSTRATOR
	{
		title: 'Super Administrator',
		role: 'super_admin'
	},
	{
		title: 'Administrator (Workspace)',
		role: 'workspace_admin'
	},
	// EXECUTIVE
	{ title: 'Chief executive officer', role: 'CEO' },
	{ title: 'Chief financial officer', role: 'CFO' },
	{ title: 'Chief production officer', role: 'CPO' },
	// MANAGER
	{ title: 'Human resources manager', role: 'HR_manager' },
	{ title: 'Legal manager', role: 'Legal_manager' },
	{ title: 'Marketing manager', role: 'Marketing_manager' },
	{ title: 'Technology manager', role: 'Technology_manager' },
	{ title: 'Compliance manager', role: 'Compliance_manager' },
	{ title: 'Risk manager', role: 'Risk_manager' },
	{ title: 'Sales manager', role: 'Sales_manager' },
	{ title: 'Procurement manager', role: 'Procurement_manager' },
	{ title: 'Innovation manager', role: 'Innovation_manager' },
	{ title: 'Quality manager', role: 'Quality_manager' },
	{ title: 'Safety manager', role: 'Safety_manager' },
	{ title: 'Environment manager', role: 'Environment_manager' },
	{ title: 'Warehouse manager', role: 'Warehouse_manager' },
	{ title: 'Production manager', role: 'Production_manager' },
	{ title: 'Accountant manager', role: 'Accountant_manager' },
	{ title: 'Tax manager', role: 'Tax_manager' },
	// CLECK
	{ title: 'Human resources clerk', role: 'HR_clerk' },
	{ title: 'Legal clerk', role: 'Legal_clerk' },
	{ title: 'Marketing clerk', role: 'Marketing_clerk' },
	{ title: 'Technology clerk', role: 'Technology_clerk' },
	{ title: 'Compliance clerk', role: 'Compliance_clerk' },
	{ title: 'Risk clerk', role: 'Risk_clerk' },
	{ title: 'Sales clerk', role: 'Sales_clerk' },
	{ title: 'Procurement clerk', role: 'Procurement_clerk' },
	{ title: 'Innovation clerk', role: 'Innovation_clerk' },
	{ title: 'Quality clerk', role: 'Quality_clerk' },
	{ title: 'Safety clerk', role: 'Safety_clerk' },
	{ title: 'Environment clerk', role: 'Environment_clerk' },
	{ title: 'Warehouse clerk', role: 'Warehouse_clerk' },
	{ title: 'Production clerk', role: 'Production_clerk' },
	{ title: 'Accountant clerk', role: 'Accountant_clerk' },
	{ title: 'Tax clerk', role: 'Tax_clerk' }
];

export const seedRoles = async () => {
	const roles = await db.select().from(roleTable);
	const workspace = await db.select().from(workspaceTable).limit(1);
	const roleList = [];
	if (roles.length === 0) {
		console.log('start seed roles');
		for (const role of roleData) {
			const newRole = await db
				.insert(roleTable)
				.values({
					id: crypto.randomUUID(),
					title: role.title,
					role: role.role,
					description: '',
					workspaceId: workspace[0].id
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
