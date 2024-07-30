import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const inquiryTable = pgTable('inquiries', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	email: varchar('email', { length: 50 }).notNull(),
	message: text('message').notNull(),
	reply: text('reply'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});
