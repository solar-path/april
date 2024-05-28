import { pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { userTable } from './users';

export const postStatusTypes = ['draft', 'published', 'archieved'] as const;
export const postStatusEnum = pgEnum('post_status', postStatusTypes);
export const readerForTypes = ['guest', 'user', 'admin'] as const;
export const readerForEnum = pgEnum('reader_for', readerForTypes);

export const blogTable = pgTable('blogs', {
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
	authorId: varchar('authorId', { length: 50 })
		.notNull()
		.references(() => userTable.id)
});
