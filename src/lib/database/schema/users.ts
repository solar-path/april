import { boolean, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

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
	surname: varchar('surname', { length: 40 })
});
