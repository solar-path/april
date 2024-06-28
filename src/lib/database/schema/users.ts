import { boolean, date, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	email: varchar('email', { length: 50 }).notNull().unique(),
	password: text('password').notNull(),
	token: varchar('token', { length: 50 }),
	activated: boolean('verified').default(false),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
	// personal information
	name: varchar('name', { length: 40 }),
	surname: varchar('surname', { length: 40 }),
	gender: varchar('gender', { length: 40 }),
	dob: date('dob'),
	avatar: varchar('avatar', { length: 255 }),
	// contact and address
	phone: varchar('phone', {
		length: 20
	}),

	country: varchar('country', { length: 100 }),
	city: varchar('city', { length: 100 }),
	state: varchar('state', { length: 100 }),
	zipcode: varchar('zipcode', { length: 20 }),
	addressLine: varchar('addressLine', { length: 250 }),
	idNumber: varchar('idNumber', { length: 20 }).unique()
});
