import { pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { userTable } from './users';
import { industryTable } from './industry';
import { addressTable } from './address';
import { contactTable } from './contact';

export const workspaceTable = pgTable('structure_workspaces', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	workspace: varchar('workspace', { length: 250 }).notNull().unique(),
	description: text('description'),
	logo: varchar('logo', { length: 250 }),

	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const regionTable = pgTable('structure_regions', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	description: text('description'),
	workspaceId: varchar('workspaceId', { length: 50 }).references(() => workspaceTable.id),
	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const companyTypeEnum = pgEnum('company_type', ['company', 'counterparty']);

export const companyTable = pgTable('structure_companies', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	description: text('description'),

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
	contact: varchar('contact', { length: 50 }).references(() => contactTable.id),
	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const departmentTable = pgTable('structure_departments', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	description: text('description'),
	workspaceId: varchar('workspaceId', { length: 50 })
		.notNull()
		.references(() => workspaceTable.id),
	companyId: varchar('companyId', { length: 50 })
		.notNull()
		.references(() => companyTable.id),
	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const positionTable = pgTable('structure_positions', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	description: text('description'),
	departmentId: varchar('departmentId', { length: 50 }).references(() => departmentTable.id),
	workspaceId: varchar('workspaceId', { length: 50 })
		.notNull()
		.references(() => workspaceTable.id),
	companyId: varchar('companyId', { length: 50 })
		.notNull()
		.references(() => companyTable.id),
	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});
