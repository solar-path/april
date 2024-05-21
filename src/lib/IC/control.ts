import { z } from 'zod';

export const controlSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, { message: 'Field cannot be blank' }),
	description: z.string().min(1, { message: 'Field cannot be blank' })
});

export const controlDeleteSchema = z.object({
	code: z.string()
});
