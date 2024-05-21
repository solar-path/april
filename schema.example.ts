import {
	boolean,
	datetime,
	mysqlEnum,
	mysqlTable,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/mysql-core';

export const userTable = mysqlTable('users', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	email: varchar('email', { length: 50 }).notNull().unique(),
	password: text('password').notNull(),
	token: varchar('token', { length: 50 }),
	activated: boolean('verified').default(false),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const sessionTable = mysqlTable('session', {
	id: varchar('id', { length: 50 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => userTable.id),
	expiresAt: datetime('expires_at').notNull()
});

export const inquiryTable = mysqlTable('inquiries', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	email: varchar('email', { length: 50 }).notNull(),
	message: text('message').notNull(),
	reply: text('reply'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const postStatusEnum = mysqlEnum('post_status', ['draft', 'published']);
export const readerForEnum = mysqlEnum('reader_for', ['guest', 'user', 'admin']);

export const blogTable: any = mysqlTable('blogs', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	content: text('content'),
	coverImage: text('coverImage'),
	parentId: varchar('parentId', { length: 50 }).references(() => blogTable.id),
	status: postStatusEnum.default('draft'),
	readingFor: readerForEnum.default('guest'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
	userID: varchar('userID', { length: 50 })
		.notNull()
		.references(() => userTable.id)
});

export const countryTable = mysqlTable('country', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	name: varchar('name', { length: 50 }).notNull().unique(),
	iso3: varchar('iso3', { length: 3 }).notNull().unique(),
	phone_code: varchar('phone_code', { length: 20 }),
	currency: varchar('currency', { length: 3 }).notNull(),
	currency_name: varchar('currency_name', { length: 100 }).notNull(),
	currency_symbol: varchar('currency_symbol', { length: 100 }).notNull(),
	tld: varchar('tld', { length: 3 }).notNull(),
	region: varchar('region', { length: 100 }).notNull(),
	subregion: varchar('subregion', { length: 100 }).notNull(),
	emoji: varchar('emoji', { length: 10 }).notNull(),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const industryTable: any = mysqlTable('industry', {
	code: varchar('code', { length: 50 }).notNull().unique().primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	description: text('description'),
	parentId: varchar('parentId', { length: 50 }).references(() => industryTable.code),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});
