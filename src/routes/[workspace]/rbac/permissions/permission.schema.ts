import { z } from 'zod';

export const permissionSchema = z.object({
	id: z.string().optional(),
	title: z.string(),
	description: z.string().optional()
});

export const deletePermissionSchema = z.object({
	id: z.string()
});
