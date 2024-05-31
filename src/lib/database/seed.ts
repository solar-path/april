import { userTable } from '../database/schema/users';
import { blogTable } from './schema/blog';
import { countryTable } from './schema/country';
import { industryTable } from './schema/industry';
import { controlTable, riskTable, processTable } from './schema/rcm';
// group structure
import workspaceData from './data/workspace.json';
import regionData from './data/region.json';
import addressData from './data/address.json';
import companyData from './data/companies.json';
import departmentData from './data/departments.json';
//
import usersData from './data/users.json';
import blogData from './data/blog.json';
import countryData from './data/countries.json';
import industryData from './data/industries.json';
import controlData from './data/controls.json';
import riskData from './data/risks.json';
import processData from './data/process.json';
import { eq } from 'drizzle-orm/mysql-core/expressions';
import { Argon2id } from 'oslo/password';
import { client, db } from './db';
import { companyTable, departmentTable, regionTable, workspaceTable } from './schema/entity';
import { addressTable } from './schema/address';

interface User {
	id: string;
	email: string;
}

const userList: User[] = [];
const workspaceList: any[] = [];
const addressList: any[] = [];
const countryList: any[] = [];
const industryList: any[] = [];
const regionList: any[] = [];
const companyList: any[] = [];
const departmentList: any[] = [];
/* Entry point
 *  returns <void>
 */
const main = async () => {
	console.log('start seeding data');
	try {
		await seedUsers();
		await seedBlog(userList[0], blogData); // Assuming blogData is the parsed JSON from blog.json
		await seedCountry();
		await seedIndustry();
		// // group structure
		await seedWorkspace(userList[0], workspaceData);
		await seedRegion(userList[0], workspaceList[0], regionData);
		await seedAddress(userList[0], addressData);
		await seedCompany(userList[0], companyData);
		await seedDepartment(userList[0], departmentData);
		// // RCM
		// await seedRisk(userList[0]);
		// await seedControl(userList[0]);
		// await seedProcess(userList[0], processData);
		console.log('data seeding complete');
		await client.end();
	} catch (error) {
		console.log('data seeding failed :: error =>', error);
	}
};

/*
 *   Seeds users into the database
 *   returns <void>
 */
const seedUsers = async () => {
	const user = await db.select().from(userTable);
	if (user.length === 0) {
		for (const user of usersData) {
			const newUser = await db
				.insert(userTable)
				.values({
					email: user.email.toLowerCase(),
					password: await new Argon2id().hash(user.password),
					id: crypto.randomUUID(),
					token: crypto.randomUUID(),
					activated: user.activated
				})
				.returning({ id: userTable.id, email: userTable.email });
			userList.push(newUser[0]);
		}
	} else {
		userList.push(...user);
		console.log('users already seeded');
	}
};

/*
 *   Seeds blog posts into the database
 *   returns <void>
 */
const seedBlog = async (user: User, blogPosts: any[], parentId: string | null = null) => {
	const posts = await db.select().from(blogTable);
	if (posts.length === 0) {
		for (const post of blogPosts) {
			const newPost = await db
				.insert(blogTable)
				.values({
					id: crypto.randomUUID(),
					title: post.title,
					content: post.content,
					author: user.id,
					status: 'published',
					parentId: parentId // This will be null for top-level posts
				})
				.returning();

			// If this post has children, recursively seed them with the current post's ID as their parentId
			if (post.children && post.children.length > 0) {
				await seedBlog(user, post.children, newPost[0].id);
			}
		}
	} else {
		console.log('blog posts already seeded');
	}
};

/*
 *   Seeds countries into the database
 *   returns <void>
 */
const seedCountry = async () => {
	const countries = await db.select().from(countryTable);
	if (countries.length === 0) {
		for (const country of countryData) {
			const newCountry = await db
				.insert(countryTable)
				.values({
					id: crypto.randomUUID(),
					name: country.name,
					iso3: country.iso3,
					phone_code: country.phone_code,
					currency: country.currency,
					currency_name: country.currency_name,
					currency_symbol: country.currency_symbol,
					tld: country.tld,
					region: country.region,
					subregion: country.subregion,
					emoji: country.emoji
				})
				.returning();
			countryList.push(newCountry[0]);
		}
	} else {
		countryList.push(...countries);
		console.log('countries already seeded');
	}
};

/*
 *   Seeds industries into the database
 *   returns <void>
 */
const seedIndustry = async () => {
	const industries = await db.select().from(industryTable);
	if (industries.length === 0) {
		for (const industry of industryData) {
			const newIndustry = await db
				.insert(industryTable)
				.values({
					id: industry.code,
					name: industry.name,
					description: industry.description,
					parentId: industry.parentId
				})
				.returning();
			industryList.push(newIndustry[0]);
		}
	} else {
		industryList.push(...industries);
		console.log('industries already seeded');
	}
};

/*
 *   Seeds workspace into the database
 *   returns <void>
 */
const seedWorkspace = async (user: User, workspaceData: any[]) => {
	const workspaces = await db.select().from(workspaceTable);
	if (workspaces.length === 0) {
		for (const workspace of workspaceData) {
			const newWorkspace = await db
				.insert(workspaceTable)
				.values({
					id: crypto.randomUUID(),
					title: workspace.title,
					author: user.id
				})
				.returning();
			workspaceList.push(newWorkspace[0]);
		}
	} else {
		workspaceList.push(...workspaces);
		console.log('workspaces already seeded');
	}
};

const seedRegion = async (user: User, workspace: any, regionData: any[]) => {
	const regions = await db.select().from(regionTable);
	if (regions.length === 0) {
		for (const region of regionData) {
			const newRegion = await db
				.insert(regionTable)
				.values({
					id: crypto.randomUUID(),
					title: region.title,
					workspaceId: workspace.id,
					author: user.id
				})
				.returning();
			regionList.push(newRegion[0]);
		}
	} else {
		regionList.push(...regions);
		console.log('regions already seeded');
	}
};

const seedAddress = async (user: User, addressData: any[]) => {
	const addresses = await db.select().from(addressTable);
	if (addresses.length === 0) {
		for (const address of addressData) {
			const newAddress = await db
				.insert(addressTable)
				.values({
					id: crypto.randomUUID(),
					city: address.city,
					state: address.state,
					zipcode: address.zipcode,
					countryId: countryList.find((c) => c.name === address.country)?.id,
					addressLine: address.addressLine,
					author: user.id
				})
				.returning();
			addressList.push(newAddress[0]);
		}
	} else {
		addressList.push(...addresses);
		console.log('addresses already seeded');
	}
};

/*
 *   Seeds org chart into the database
 *   returns <void>
 */
const seedCompany = async (user: User, companyData: any[]) => {
	const companies = await db.select().from(companyTable);
	if (companies.length === 0) {
		for (const company of companyData) {
			const newCompany = await db
				.insert(companyTable)
				.values({
					id: crypto.randomUUID(),
					title: company.title,
					logo: '',
					type: 'company',
					workspaceId: workspaceList[0].id,
					regionId: regionList[0].id,
					industryId: industryList.find((i) => i.name === company.industry)?.id,
					BIN: company.BIN,
					address: addressList[0].id,
					author: user.id
				})
				.returning();
			companyList.push(newCompany[0]);
		}
	} else {
		companyList.push(...companies);
		console.log('companies already seeded');
	}
};

const seedDepartment = async (user: User, departmentData: any[]) => {
	const departments = await db.select().from(departmentTable);
	if (departments.length === 0) {
		for (const department of departmentData) {
			const newDepartment = await db
				.insert(departmentTable)
				.values({
					id: crypto.randomUUID(),
					title: department.title,
					companyId: companyList[0].id,
					author: user.id
				})
				.returning();
			departmentList.push(newDepartment[0]);
		}
	} else {
		departmentList.push(...departments);
		console.log('departments already seeded');
	}
};

// /*
//  *   Seeds risks into the database
//  *   returns <void>
//  */
// const seedRisk = async (user: User) => {
// 	for (const risk of riskData) {
// 		await db.insert(riskTable).values({
// 			id: crypto.randomUUID(),

// 			title: risk.title,
// 			author: user.id
// 		});
// 	}
// };

// /*
//  *   Seeds controls into the database
//  *   returns <void>
//  */
// const seedControl = async (user: User) => {
// 	for (const control of controlData) {
// 		await db.insert(controlTable).values({
// 			id: crypto.randomUUID(),
// 			title: control.title,
// 			description: control.description,
// 			author: user.id
// 		});
// 	}
// };

// const seedProcess = async (user: User, processList: any[], parentId: string | null = null) => {
// 	for (const process of processList) {
// 		await db.insert(processTable).values({
// 			id: crypto.randomUUID(),
// 			title: process.title,
// 			description: process.description,
// 			userID: user.id,
// 			parentId: parentId // This will be null for top-level posts
// 		});

// 		const insertedProcess = await db
// 			.select({ id: processTable.id })
// 			.from(processTable)
// 			.where(eq(processTable.title, process.title))
// 			.limit(1);

// 		// If this post has children, recursively seed them with the current post's ID as their parentId
// 		if (process.children && process.children.length > 0) {
// 			await seedProcess(user, process.children, insertedProcess[0].id);
// 		}
// 	}
// };

/*
 *   Execute entry point
 *   returns <void>
 */
main();
