import { pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { userTable } from './users';
import { workspaceTable } from './entity';

//
// Levels:
// - view: can read the data
// - create: can read & create the data
// - edit: can view, read & edit the data
// - full: can view, read, create, edit, delete the data
//
export const levelEnum = pgEnum('level', ['view', 'create', 'edit', 'full']);

export const roleTable = pgTable('rbac_role', {
	id: varchar('id', { length: 50 }).primaryKey(),
	title: varchar('title', { length: 50 }).notNull().unique(),
	role: varchar('role', { length: 50 }).notNull(),
	description: text('description'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
	workspaceId: varchar('workspaceId', { length: 50 }).references(() => workspaceTable.id)
});

export const userRoleTable = pgTable('rbac_user_role', {
	id: varchar('id', { length: 50 }).primaryKey(),
	userId: varchar('userId', { length: 50 }).references(() => userTable.id),
	roleId: varchar('roleId', { length: 50 }).references(() => roleTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
	workspaceId: varchar('workspaceId', { length: 50 }).references(() => workspaceTable.id)
});

export const permissionTable = pgTable('rbac_permission', {
	id: varchar('id', { length: 50 }).primaryKey(),
	title: varchar('title', { length: 50 }).notNull().unique(),
	permission: varchar('permission', { length: 50 }).notNull(),
	description: text('description'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
	workspaceId: varchar('workspaceId', { length: 50 }).references(() => workspaceTable.id)
});

export const rolePermissionTable = pgTable('rbac_role_permission', {
	id: varchar('id', { length: 50 }).primaryKey(),
	roleId: varchar('roleId', { length: 50 }).references(() => roleTable.id),
	permissionId: varchar('permissionId', { length: 50 }).references(() => permissionTable.id),
	level: levelEnum('level').notNull(),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
	workspaceId: varchar('workspaceId', { length: 50 }).references(() => workspaceTable.id)
});

// Optional: User-specific permissions
export const userPermissionTable = pgTable('rbac_user_permission', {
	id: varchar('id', { length: 50 }).primaryKey(),
	userId: varchar('userId', { length: 50 }).references(() => userTable.id),
	permissionId: varchar('permissionId', { length: 50 }).references(() => permissionTable.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
	workspaceId: varchar('workspaceId', { length: 50 }).references(() => workspaceTable.id)
});
