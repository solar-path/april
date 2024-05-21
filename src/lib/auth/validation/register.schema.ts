import { z } from 'zod';

export const registerSchema = z.object({
	email: z.string().email().min(1, { message: 'Field cannot be blank' }),
	password: z
		.string()
		.min(8, { message: 'Password length must be at least 8 characters' })
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/, {
			message:
				'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character'
		}),
	terms: z.boolean().refine((val) => val === true, {
		message: 'You must accept the terms and conditions'
	})
});
