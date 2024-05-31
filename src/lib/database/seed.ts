import { userTable } from '../database/schema/users';
import { blogTable } from './schema/blog';
import { countryTable } from './schema/country';
import { industryTable } from './schema/industry';
import { controlTable, riskTable, processTable } from './schema/rcm';
// group structure
import workspaceData from './data/workspace.json';
import regionData from './data/region.json';
import addressData from './data/address.json';
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
import { regionTable, workspaceTable } from './schema/entity';

interface User {
	id: string;
	email: string;
}

const userList: User[] = [];
const workspaceList: any[] = [];
const addressList: any[] = [];
const countryList: any[] = [];
const industryList: any[] = [];
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
		// await seedWorkspace(userList[0], workspaceData);
		// await seedRegion(userList[0], regionData);
		// await seedAddress(userList[0], addressData);
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
};

/*
 *   Seeds blog posts into the database
 *   returns <void>
 */
const seedBlog = async (user: User, blogPosts: any[], parentId: string | null = null) => {
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
};

/*
 *   Seeds countries into the database
 *   returns <void>
 */
const seedCountry = async () => {
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
};

interface Industry {
	code: number;
	name: string;
	description?: string;
	children?: Industry[];
}

/*
 *   Seeds industries into the database
 *   returns <void>
 */
const seedIndustry = async () => {
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
};

// /*
//  *   Seeds workspace into the database
//  *   returns <void>
//  */
// const seedWorkspace = async (user: User, workspaceData: any[]) => {
// 	for (const workspace of workspaceData) {
// 		const newWorkspace = await db
// 			.insert(workspaceTable)
// 			.values({
// 				id: crypto.randomUUID(),
// 				title: workspace.title,
// 				authorId: user.id
// 			})
// 			.returning();
// 		workspaceList.push(newWorkspace[0]);
// 	}
// };

// const seedRegion = async (user: User, regionData: any[]) => {
// 	for (const region of regionData) {
// 		await db.insert(regionTable).values({
// 			id: crypto.randomUUID(),
// 			title: region.title,
// 			// workspaceId: await
// 			authorId: user.id
// 		});
// 	}
// };

// // const seedAddress = async (user: User, addressData: any[]) => {
// // 	for (const address of addressData) {
// // 		const newAddress = await db
// // 			.insert(addressTable)
// // 			.values({
// // 				id: crypto.randomUUID(),
// // 				city: address.city,
// // 				state: address.state,
// // 				zipcode: address.zipcode,
// // 				country: address.country,
// // 				addressLine: address.addressLine,
// // 				authorId: user.id
// // 			})
// // 			.returning();
// // 		addressList.push(newAddress[0]);
// // 	}
// // };
// /*
//  *   Seeds org chart into the database
//  *   returns <void>
//  */
// // const seedEntity = async (user: User, structures: any[], parentId: string | null = null) => {
// // 	for (const item of structures) {
// // 		// Use the parameter structures instead of orgChartData
// // 		await db.insert(entityTable).values({
// // 			id: crypto.randomUUID(),
// // 			title: item.title,
// // 			type: item.type,
// // 			authorId: user.id,
// // 			parentId: parentId // Use the parameter reportTo to set parent ID
// // 		});

// // 		const insertedItem = await db
// // 			.select({ id: entityTable.id })
// // 			.from(entityTable)
// // 			.where(eq(entityTable.title, item.title))
// // 			.limit(1);

// // 		// If this item has children, recursively seed them with the current item's ID as their parentId
// // 		if (item.children && item.children.length > 0) {
// // 			await seedEntity(user, item.children, insertedItem[0].id);
// // 		}
// // 	}
// // };

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
