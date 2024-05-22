import { z } from 'zod';

export const riskSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, { message: 'Field cannot be blank' })
});

export const riskDeleteSchema = z.object({
	code: z.string()
});
