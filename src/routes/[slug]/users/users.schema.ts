import { z } from 'zod';

export const inviteUserSchema = z.object({
	email: z
		.string()
		.email({ message: 'Invalid email address' })
		.min(1, { message: 'Required field' })
});

export const removeUserFromWorkspace = z.object({
	id: z.string().min(1, { message: 'Required field' })
});
