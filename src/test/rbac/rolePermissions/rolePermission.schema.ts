import { db } from '$lib/database/db';
import { permissionTable, roleTable } from '$lib/database/schema/rbac';
import { z } from 'zod';

const roles = await db.select().from(roleTable);
const permissions = await db.select().from(permissionTable);

export const rolePermissionSchema = z.object({
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
	permissionId: z.string(),
	permission: z
		.string()
		.min(1, { message: 'Required field' })
		.refine(
			(value) => {
				const validItems = permissions.map((unit) => unit.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid permission' }
		)
});

export const deleteRolePermissionSchema = z.object({
	id: z.string().min(1, { message: 'Required field' })
});
