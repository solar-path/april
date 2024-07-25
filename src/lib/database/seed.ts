import { client, db } from './db';

import { seedUsers } from './data/users';
import { seedBlog } from './data/blog';
import { seedCountry } from './data/countries';
import { seedIndustry } from './data/industries';
import { seedWorkspace } from './data/entity_workspace';
import { seedRegion } from './data/entity_region';
import { seedAddress } from './data/address';
import { seedCompany } from './data/entity_companies';
import { seedDepartment } from './data/entity_departments';
import { seedPosition } from './data/positions';
import { seedRisk } from './data/rcm_risks';
import { seedControl } from './data/rcm_controls';
import { seedProcess } from './data/rcm_process';

const main = async () => {
	console.log('start seeding data');
	try {
		await seedUsers();
		await seedBlog();
		await seedCountry();
		await seedIndustry();
		// // group structure
		await seedWorkspace();
		await seedRegion();
		await seedAddress();
		await seedCompany();
		await seedDepartment();
		await seedPosition();
		// RCM
		await seedRisk();
		await seedControl();
		await seedProcess();

		//RBAC
		// await seedRoles(roleData);
		// await seedPermissions(permissionData);
		console.log('data seeding complete');
		await client.end();
	} catch (error) {
		console.log('data seeding failed :: error =>', error);
	}
};

const seedPermissions = async (permissionData: any[]) => {
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
};

/*
 *   Execute entry point
 *   returns <void>
 */
main();
