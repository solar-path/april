import { z } from 'zod';

export const roleSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, { message: 'Required field' }),
	description: z.string().optional()
});

export const deleteRoleSchema = z.object({
	id: z.string().min(1, { message: 'Required field' })
});
