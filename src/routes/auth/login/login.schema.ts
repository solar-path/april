import { z } from 'zod';

// Name has a default value just to display something in the form.
export const loginSchema = z.object({
	email: z.string().email().min(1, { message: 'Field cannot be blank' }),
	password: z.string().min(1, { message: 'Field cannot be blank' })
});
