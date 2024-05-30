import { pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { userTable } from './users';
import { industryTable } from './industry';
import { countryTable } from './country';
import { addressTable } from './address';

export const entityTypes = [
	'workspace',
	'region',
	'company',
	'department',
	'position',
	'employee',
	'contractor',
	'intern',
	'project'
] as const;

export const entityTypeEnum = pgEnum('entity_type', entityTypes);

export const workspaceTable = pgTable('workspaces', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	authorId: varchar('authorId', { length: 50 }).references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const regionTable = pgTable('regions', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	workspaceId: varchar('workspaceId', { length: 50 }).references(() => workspaceTable.id),
	authorId: varchar('authorId', { length: 50 }).references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const companyTypeEnum = pgEnum('company_type', ['company', 'counterparty']);

export const companyTable = pgTable('companies', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	type: companyTypeEnum('company_type').notNull(),
	regionId: varchar('regionId', { length: 50 }).references(() => regionTable.id),
	workspaceId: varchar('workspaceId', { length: 50 }).references(() => workspaceTable.id),
	industryId: varchar('industryId', { length: 50 }).references(() => industryTable.id),
	residence: varchar('countryId', { length: 50 }).references(() => countryTable.id),
	BIN: varchar('businessIdentificationNumber', { length: 50 }),
	address: varchar('address', { length: 50 }).references(() => addressTable.id),
	authorId: varchar('authorId', { length: 50 }).references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const departmentTable = pgTable('departments', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	companyId: varchar('companyId', { length: 50 }).references(() => companyTable.id),
	authorId: varchar('authorId', { length: 50 }).references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const positionTable = pgTable('positions', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	departmentId: varchar('departmentId', { length: 50 }).references(() => departmentTable.id),
	authorId: varchar('authorId', { length: 50 }).references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

// export const entityTable: any = pgTable('entities', {
// 	id: varchar('id', {
// 		length: 50
// 	}).primaryKey(),
// 	title: varchar('title', { length: 250 }).notNull(),
// 	type: entityTypeEnum('department').notNull(),
// 	parentId: varchar('parentId', { length: 50 }).references(() => entityTable.id),
// 	authorId: varchar('authorId', { length: 50 }).references(() => userTable.id),
// 	createdAt: timestamp('createdAt').notNull().defaultNow(),
// 	updatedAt: timestamp('updatedAt').notNull().defaultNow()
// });
