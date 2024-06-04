import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { userTable } from './users';
import { companyTable } from './entity';

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
	companyId: varchar('companyId', { length: 50 })
		.notNull()
		.references(() => companyTable.id),
	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});
