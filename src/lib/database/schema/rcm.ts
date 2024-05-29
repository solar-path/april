import { pgTable, timestamp, varchar, text, pgEnum } from 'drizzle-orm/pg-core';
import { entityTable } from './entity';
import { userTable } from './users';

export const riskTable = pgTable('rcm_risk', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),

	title: varchar('title', {
		length: 200
	}),
	author: varchar('author', { length: 50 }).references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const controlTable = pgTable('rcm_control', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),

	title: varchar('title', {
		length: 200
	}),
	description: text('description').notNull(),
	author: varchar('author', { length: 50 }).references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const processTable: any = pgTable('rcm_process', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),

	title: varchar('title', {
		length: 200
	}),
	description: text('description'),
	author: varchar('author', { length: 50 }).references(() => userTable.id),
	parentId: varchar('parentId', { length: 50 }).references(() => processTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const frequencyEnum = pgEnum('frequency_type', [
	'On-demand',
	'Daily',
	'Weekly',
	'Monthly',
	'Quarterly',
	'Annually'
]);

export const controlTypeEnum = pgEnum('control_type', ['Preventive', 'Detective', 'SoD']);

export const executionTypeEnum = pgEnum('execution_type', ['Manual', 'IT-Dependend', 'Automated']);

export const matrixTable = pgTable('rcm_Matrix', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	entityId: varchar('entityId', { length: 50 }).references(() => entityTable.id),
	processId: varchar('processId', { length: 50 }).references(() => processTable.id),
	riskId: varchar('riskId', { length: 50 }).references(() => riskTable.id),
	controlId: varchar('controlId', { length: 50 }).references(() => controlTable.id),
	description: text('description').notNull(),
	frequency: frequencyEnum('frequency_type').notNull(),
	type: controlTypeEnum('control_type').notNull(),
	execution: executionTypeEnum('execution_type').notNull(),
	controlOwner: varchar('controlOwner', { length: 50 }).references(() => entityTable.id),
	author: varchar('author', { length: 50 }).references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});
