import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { userTable } from './users';

export const roleTable = pgTable('rbac_role', {
	id: varchar('id', { length: 50 }).primaryKey(),
	title: varchar('title', { length: 50 }).notNull().unique(),
	description: text('description'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const userRoleTable = pgTable('rbac_user_role', {
	id: varchar('id', { length: 50 }).primaryKey(),
	userId: varchar('userId', { length: 50 }).references(() => userTable.id),
	roleId: varchar('roleId', { length: 50 }).references(() => roleTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const permissionTable = pgTable('rbac_permission', {
	id: varchar('id', { length: 50 }).primaryKey(),
	title: varchar('title', { length: 50 }).notNull().unique(),
	description: text('description'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

export const rolePermissionTable = pgTable('rbac_role_permission', {
	id: varchar('id', { length: 50 }).primaryKey(),
	roleId: varchar('roleId', { length: 50 }).references(() => roleTable.id),
	permissionId: varchar('permissionId', { length: 50 }).references(() => permissionTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});

// Optional: User-specific permissions
export const userPermissionTable = pgTable('rbac_user_permission', {
	id: varchar('id', { length: 50 }).primaryKey(),
	userId: varchar('userId', { length: 50 }).references(() => userTable.id),
	permissionId: varchar('permissionId', { length: 50 }).references(() => permissionTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow()
});
