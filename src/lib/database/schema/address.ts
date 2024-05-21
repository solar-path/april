import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const addressTable: any = pgTable('addresses', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	country: varchar('country', { length: 100 }).notNull(),
	city: varchar('city', { length: 100 }).notNull(),
	state: varchar('state', { length: 100 }).notNull(),
	zipcode: varchar('zipcode', { length: 20 }).notNull(),
	addressLine1: varchar('addressLine1', { length: 250 }).notNull()
});
