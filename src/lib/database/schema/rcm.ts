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

export const processTable = pgTable('rcm_process', {
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

export const frequencyTypes = [
	'On-demand',
	'Daily',
	'Weekly',
	'Monthly',
	'Quarterly',
	'Annually'
] as const;
export const frequencyEnum = pgEnum('frequency_type', frequencyTypes);

export const controlType = ['Preventive', 'Detective', 'SoD'] as const;
export const controlTypeEnum = pgEnum('control_type', controlType);

export const executionType = ['Manual', 'IT-Dependend', 'Automated'] as const;
export const executionTypeEnum = pgEnum('control_type', executionType);

export const matrixTable = pgTable('rcm_Matrix', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	entityId: varchar('companyId', { length: 50 }).references(() => entityTable.id),
	processId: varchar('processId', { length: 50 }).references(() => processTable.id),
	riskId: varchar('riskId', { length: 50 }).references(() => riskTable.id),
	controlId: varchar('controlId', { length: 50 }).references(() => controlTable.id),
	description: text('description').notNull(),
	frequency: frequencyEnum('Monthly').notNull(),
	type: controlTypeEnum('Preventive').notNull(),
	execution: executionTypeEnum('Manual').notNull(),
	controlOwner: varchar('controlOwner', { length: 50 }).references(() => entityTable.id),
	author: varchar('author', { length: 50 }).references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});
