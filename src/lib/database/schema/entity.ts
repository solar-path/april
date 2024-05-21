import { pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { userTable } from './users';

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

export const entityTable: any = pgTable('entities', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	type: entityTypeEnum('department').notNull(),
	parentId: varchar('parentId', { length: 50 }).references(() => entityTable.id),
	authorId: varchar('authorId', { length: 50 }).references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});
