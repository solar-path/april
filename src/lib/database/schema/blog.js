import { pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { userTable } from './users';

export const postStatusEnum = pgEnum('post_status', ['draft', 'published', 'archieved']);
export const readerForEnum = pgEnum('reader_for', ['guest', 'user', 'admin']);

export const blogTable: any = pgTable('blogs', {
	id: varchar('id', {
		length: 50
	}).primaryKey(),
	title: varchar('title', { length: 250 }).notNull(),
	content: text('content'),
	coverImage: text('coverImage'),
	parentId: varchar('parentId', { length: 50 }).references(() => blogTable.id),
	status: postStatusEnum('draft'),
	readingFor: readerForEnum('guest'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
	author: varchar('author', { length: 50 })
		.notNull()
		.references(() => userTable.id)
});
