import { db } from '$lib/database/db';
import { roleTable } from '$lib/database/schema/rbac';
import { userTable } from '$lib/database/schema/users';
import { z } from 'zod';

const roles = await db.select().from(roleTable);
const users = await db.select().from(userTable);

export const userRoleSchema = z.object({
	id: z.string().optional(),
	roleId: z.string(),
	role: z
		.string()
		.min(1, { message: 'Required field' })
		.refine(
			(value) => {
				const validItems = roles.map((unit) => unit.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid role' }
		),
	userId: z.string(),
	user: z
		.string()
		.min(1, { message: 'Required field' })
		.refine(
			(value) => {
				const validItems = users.map((unit) => unit.email.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid user' }
		)
});

export const deleteUserRoleSchema = z.object({
	id: z.string().min(1, { message: 'Required field' })
});
