import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { countryTable } from './country';

export const addressTable = pgTable('addresses', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	country: varchar('country', { length: 50 }).references(() => countryTable.id),
	city: varchar('city', { length: 100 }).notNull(),
	state: varchar('state', { length: 100 }).notNull(),
	zipcode: varchar('zipcode', { length: 20 }).notNull(),
	addressLine: varchar('addressLine1', { length: 250 }).notNull()
});
