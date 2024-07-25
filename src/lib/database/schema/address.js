import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { countryTable } from './country';
import { userTable } from './users';

export const addressTable = pgTable('addresses', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	countryId: varchar('countryId', { length: 50 })
		.notNull()
		.references(() => countryTable.id),
	city: varchar('city', { length: 100 }).notNull(),
	state: varchar('state', { length: 100 }),
	zipcode: varchar('zipcode', { length: 20 }).notNull(),
	addressLine: varchar('addressLine1', { length: 250 }).notNull(),
	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id)
});
