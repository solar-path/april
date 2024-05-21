import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const industryTable: any = pgTable('industry', {
	code: varchar('code', { length: 50 }).notNull().unique().primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	description: text('description'),
	parentId: varchar('parentId', { length: 50 }).references(() => industryTable.code),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});
