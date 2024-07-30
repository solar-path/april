import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const countryTable = pgTable('country', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	name: varchar('name', { length: 50 }).notNull().unique(),
	iso3: varchar('iso3', { length: 3 }).notNull().unique(),
	phone_code: varchar('phone_code', { length: 20 }),
	currency: varchar('currency', { length: 3 }).notNull(),
	currency_name: varchar('currency_name', { length: 100 }).notNull(),
	currency_symbol: varchar('currency_symbol', { length: 100 }).notNull(),
	tld: varchar('tld', { length: 3 }).notNull(),
	region: varchar('region', { length: 100 }).notNull(),
	subregion: varchar('subregion', { length: 100 }).notNull(),
	emoji: varchar('emoji', { length: 10 }).notNull(),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});
