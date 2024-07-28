import { client } from './db';

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
import { seedRoles } from './data/rbac_roles';
import { seedPermissions } from './data/rbac_permissions';

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
		await seedRoles();
		await seedPermissions();
		console.log('data seeding complete');
		await client.end();
	} catch (error) {
		console.error('data seeding failed :: error =>', error);
	}
};

main();
