import { pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { userTable } from './users';
import { industryTable } from './industry';
import { addressTable } from './address';

export const workspaceTable = pgTable('workspaces', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const regionTable = pgTable('regions', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	workspaceId: varchar('workspaceId', { length: 50 }).references(() => workspaceTable.id),
	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const companyTypeEnum = pgEnum('company_type', ['company', 'counterparty']);

export const companyTable = pgTable('companies', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	logo: varchar('logo', { length: 250 }),
	type: companyTypeEnum('company_type').notNull(),
	regionId: varchar('regionId', { length: 50 })
		.notNull()
		.references(() => regionTable.id),
	workspaceId: varchar('workspaceId', { length: 50 })
		.notNull()
		.references(() => workspaceTable.id),
	industryId: varchar('industryId', { length: 50 })
		.notNull()
		.references(() => industryTable.id),

	BIN: varchar('businessIdentificationNumber', { length: 50 }).unique(),
	address: varchar('address', { length: 50 }).references(() => addressTable.id),
	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const departmentTable = pgTable('departments', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	companyId: varchar('companyId', { length: 50 }).references(() => companyTable.id),
	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const positionTable = pgTable('positions', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	departmentId: varchar('departmentId', { length: 50 }).references(() => departmentTable.id),
	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});
