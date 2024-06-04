import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { userTable } from './users';

export const contactTable = pgTable('contact', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	email: varchar('email', {
		length: 256
	}),
	phone: varchar('phone', {
		length: 20
	}),
	website: varchar('website', {
		length: 256
	}),

	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});
