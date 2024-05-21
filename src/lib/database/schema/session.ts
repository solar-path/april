import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { userTable } from './users';

export const sessionTable = pgTable('session', {
	id: varchar('id', { length: 50 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
