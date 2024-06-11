import { z } from 'zod';

export const contactSchema = z.object({
	phone: z.string().min(1, { message: 'Required field' }),
	email: z.string().min(1, { message: 'Required field' }),
	website: z.string().optional()
});
export const deleteContactSchema = z.object({
	id: z.string()
});
