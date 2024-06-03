import { userTable } from '../database/schema/users';
import { blogTable } from './schema/blog';
import { countryTable } from './schema/country';
import { industryTable } from './schema/industry';
import { controlTable, riskTable, processTable } from './schema/rcm';
// group structure
import {
	companyTable,
	departmentTable,
	positionTable,
	regionTable,
	workspaceTable
} from './schema/entity';
import workspaceData from './data/workspace.json';
import regionData from './data/region.json';
import addressData from './data/address.json';
import companyData from './data/companies.json';
import departmentData from './data/departments.json';
import positionData from './data/positions.json';
//
import usersData from './data/users.json';
import blogData from './data/blog.json';
import countryData from './data/countries.json';
import industryData from './data/industries.json';
import controlData from './data/controls.json';
import riskData from './data/risks.json';
import processData from './data/process.json';
import { Argon2id } from 'oslo/password';
import { client, db } from './db';
import { addressTable } from './schema/address';

interface User {
	id: string;
	email: string;
}

const blogList: any[] = [];
const userList: User[] = [];
const workspaceList: any[] = [];
const addressList: any[] = [];
const countryList: any[] = [];
const industryList: any[] = [];
const regionList: any[] = [];
const companyList: any[] = [];
const departmentList: any[] = [];
const positionList: any[] = [];
const riskList: any[] = [];
const controlList: any[] = [];
const processList: any[] = [];

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
		await seedPosition(userList[0], positionData);
		// RCM
		await seedRisk(userList[0]);
		await seedControl(userList[0]);
		await seedProcess(userList[0], processData);
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
		console.log('start seed users');
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
		console.log('users seed completed');
	} else {
		userList.push(...user);
		console.log('users already seeded');
	}
};

/*
 *   Seeds blog posts into the database
 *   returns <void>
 */

interface BlogPost {
	id: string;
	title: string;
	content: string;
	coverImage: string | null;
	author: string;
	status: string;
	parentId: string | null;
	readingFor: string;
	children: BlogPost[];
}

const seedBlog = async (user: User, blogPosts: BlogPost[]) => {
	const posts = await db.select().from(blogTable);
	if (posts.length === 0) {
		console.log('start seed blog');

		for (const post of blogPosts) {
			const newPost = await db
				.insert(blogTable)
				.values({
					id: crypto.randomUUID(),
					title: post.title,
					content: post.content,
					coverImage: post.coverImage || null, // Use coverImage from the post or null if not provided
					author: user.id,
					status: 'published',
					parentId: post.parent === null ? null : blogList.find((p) => p.title === post.parent)?.id, // This will be null for top-level posts
					readingFor: 'guest'
				})
				.returning();
			blogList.push(newPost[0]);
		}
		console.log('blog seed completed');
	} else {
		blogList.push(...posts);
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
		console.log('start seed countries');
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
		console.log('countries seed completed');
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
		console.log('start seed industries');
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
		console.log('industries seed completed');
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
		console.log('start seed workspaces');
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
		console.log('workspaces seed completed');
	} else {
		workspaceList.push(...workspaces);
		console.log('workspaces already seeded');
	}
};

const seedRegion = async (user: User, workspace: any, regionData: any[]) => {
	const regions = await db.select().from(regionTable);
	if (regions.length === 0) {
		console.log('start seed regions');
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
		console.log('regions seed completed');
	} else {
		regionList.push(...regions);
		console.log('regions already seeded');
	}
};

const seedAddress = async (user: User, addressData: any[]) => {
	const addresses = await db.select().from(addressTable);
	if (addresses.length === 0) {
		console.log('start seed addresses');
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
		console.log('addresses seed completed');
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
		console.log('start seed companies');
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
		console.log('companies seed completed');
	} else {
		companyList.push(...companies);
		console.log('companies already seeded');
	}
};

const seedDepartment = async (user: User, departmentData: any[]) => {
	const departments = await db.select().from(departmentTable);
	if (departments.length === 0) {
		console.log('start seed departments');
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
		console.log('departments seed completed');
	} else {
		departmentList.push(...departments);
		console.log('departments already seeded');
	}
};

const seedPosition = async (user: User, positionData: any[]) => {
	const positions = await db.select().from(positionTable);
	if (positions.length === 0) {
		console.log('start seed positions');
		for (const position of positionData) {
			const newPosition = await db
				.insert(positionTable)
				.values({
					id: crypto.randomUUID(),
					title: position.title,
					departmentId: departmentList.find((d) => d.title === position.department)?.id,
					companyId: companyList.find((c) => c.title === position.company)?.id,
					author: user.id
				})
				.returning();
			positionList.push(newPosition[0]);
		}
		console.log('positions seed completed');
	} else {
		positionList.push(...positions);
		console.log('positions already seeded');
	}
};

/*
 *   Seeds risks into the database
 *   returns <void>
 */
const seedRisk = async (user: User) => {
	const risks = await db.select().from(riskTable);
	if (risks.length === 0) {
		console.log('start seed risks');
		for (const risk of riskData) {
			const newRisk = await db
				.insert(riskTable)
				.values({
					id: crypto.randomUUID(),
					title: risk.title,
					author: user.id
				})
				.returning();
			riskList.push(newRisk[0]);
		}
		console.log('risks seed completed');
	} else {
		riskList.push(...risks);
		console.log('risks already seeded');
	}
};

/*
 *   Seeds controls into the database
 *   returns <void>
 */
const seedControl = async (user: User) => {
	const controls = await db.select().from(controlTable);
	if (controls.length === 0) {
		console.log('start seed controls');
		for (const control of controlData) {
			const newControl = await db
				.insert(controlTable)
				.values({
					id: crypto.randomUUID(),
					title: control.title,
					description: control.description,
					author: user.id
				})
				.returning();
			controlList.push(newControl[0]);
		}
		console.log('controls seed completed');
	} else {
		controlList.push(...controls);
		console.log('controls already seeded');
	}
};

const seedProcess = async (user: User, processData: any[]) => {
	const processes = await db.select().from(processTable);

	if (processes.length === 0) {
		console.log('start seed processes');
		for (const process of processData) {
			const newProcess = await db
				.insert(processTable)
				.values({
					id: crypto.randomUUID(),
					title: process.title,
					description: process.description,
					author: user.id,
					parentId:
						process.parent === null ? null : processList.find((p) => p.title === process.parent)?.id // This will be null for top-level posts
				})
				.returning();

			processList.push(newProcess[0]);
		}
		console.log('processes seed completed');
	} else {
		processList.push(...processes);
		console.log('processes already seeded');
	}
};

/*
 *   Execute entry point
 *   returns <void>
 */
main();
