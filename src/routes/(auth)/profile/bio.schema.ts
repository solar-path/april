import { z } from 'zod';

export const bioSchema = z.object({
	name: z.string().min(1, { message: 'Field cannot be blank' }),
	surname: z.string().min(1, { message: 'Field cannot be blank' }),
	gender: z.string().optional(),
	dob: z.date().optional(),
	avatar: z.string().optional()
});
