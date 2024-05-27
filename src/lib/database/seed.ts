import { userTable } from '../database/schema/users';
import { blogTable } from '../database/schema/blog';
import { countryTable } from '../database/schema/country';
import { industryTable } from '../database/schema/industry';
import { controlTable, riskTable, processTable } from '../database/schema/rcm';
import usersData from './data/users.json';
import blogData from './data/blog.json';
import countryData from './data/countries.json';
import industryData from './data/industries.json';
import orgChartData from './data/structure.json';
import controlData from './data/controls.json';
import riskData from './data/risks.json';
import processData from './data/process.json';
import { eq } from 'drizzle-orm/mysql-core/expressions';
import { Argon2id } from 'oslo/password';
import { entityTable } from './schema/entity';
import { client, db } from './db';

interface User {
	id: string;
	email: string;
}

const userList: User[] = [];

/* Entry point
 *  returns <void>
 */
const main = async () => {
	console.log('start seeding data');
	try {
		await seedUsers();
		await getUsersFromDB();
		await seedBlog(userList[0], blogData); // Assuming blogData is the parsed JSON from blog.json
		await seedCountry();
		await seedIndustry();
		await seedEntity(userList[0], orgChartData);
		await seedRisk(userList[0]);
		await seedControl(userList[0]);
		await seedProcess(userList[0], processData);
		console.log('data seeding complete');
		await client.end();
	} catch (error) {
		console.log('data seeding failed', error);
	}
};

/*
 *   Seeds users into the database
 *   returns <void>
 */
const seedUsers = async () => {
	for (const user of usersData) {
		await db.insert(userTable).values({
			email: user.email.toLowerCase(),
			password: await new Argon2id().hash(user.password),
			id: crypto.randomUUID(),
			token: crypto.randomUUID(),
			activated: user.activated
		});
	}
};

/*
 *   Fetches users from the database
 *   returns <void>
 */
const getUsersFromDB = async () => {
	const users = await db.select({ id: userTable.id, email: userTable.email }).from(userTable);
	userList.push(...users);
};

/*
 *   Seeds blog posts into the database
 *   returns <void>
 */
const seedBlog = async (user: User, blogPosts: any[], parentId: string | null = null) => {
	for (const post of blogPosts) {
		await db.insert(blogTable).values({
			id: crypto.randomUUID(),
			title: post.title,
			content: post.content,
			authorId: user.id,
			status: 'published',
			parentId: parentId // This will be null for top-level posts
		});

		const insertedPost = await db
			.select({ id: blogTable.id })
			.from(blogTable)
			.where(eq(blogTable.title, post.title))
			.limit(1);

		// If this post has children, recursively seed them with the current post's ID as their parentId
		if (post.children && post.children.length > 0) {
			await seedBlog(user, post.children, insertedPost[0].id);
		}
	}
};

/*
 *   Seeds countries into the database
 *   returns <void>
 */
const seedCountry = async () => {
	for (const country of countryData) {
		await db.insert(countryTable).values({
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
		});
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
		await db.insert(industryTable).values({
			code: industry.code,
			name: industry.name,
			description: industry.description,
			parentId: industry.parentId
		});
	}
};

/*
 *   Seeds org chart into the database
 *   returns <void>
 */
const seedEntity = async (user: User, structures: any[], parentId: string | null = null) => {
	for (const item of structures) {
		// Use the parameter structures instead of orgChartData
		await db.insert(entityTable).values({
			id: crypto.randomUUID(),
			title: item.title,
			type: item.type,
			authorId: user.id,
			parentId: parentId // Use the parameter reportTo to set parent ID
		});

		const insertedItem = await db
			.select({ id: entityTable.id })
			.from(entityTable)
			.where(eq(entityTable.title, item.title))
			.limit(1);

		// If this item has children, recursively seed them with the current item's ID as their parentId
		if (item.children && item.children.length > 0) {
			await seedEntity(user, item.children, insertedItem[0].id);
		}
	}
};

/*
 *   Seeds risks into the database
 *   returns <void>
 */
const seedRisk = async (user: User) => {
	for (const risk of riskData) {
		await db.insert(riskTable).values({
			id: crypto.randomUUID(),

			title: risk.title,
			author: user.id
		});
	}
};

/*
 *   Seeds controls into the database
 *   returns <void>
 */
const seedControl = async (user: User) => {
	for (const control of controlData) {
		await db.insert(controlTable).values({
			id: crypto.randomUUID(),
			title: control.title,
			description: control.description,
			author: user.id
		});
	}
};

const seedProcess = async (user: User, processList: any[], parentId: string | null = null) => {
	for (const process of processList) {
		await db.insert(processTable).values({
			id: crypto.randomUUID(),
			title: process.title,
			description: process.description,
			userID: user.id,
			parentId: parentId // This will be null for top-level posts
		});

		const insertedProcess = await db
			.select({ id: processTable.id })
			.from(processTable)
			.where(eq(processTable.title, process.title))
			.limit(1);

		// If this post has children, recursively seed them with the current post's ID as their parentId
		if (process.children && process.children.length > 0) {
			await seedProcess(user, process.children, insertedProcess[0].id);
		}
	}
};

/*
 *   Execute entry point
 *   returns <void>
 */
main();
