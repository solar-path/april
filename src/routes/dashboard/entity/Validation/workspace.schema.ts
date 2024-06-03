import { z } from 'zod';

export const workspaceSchema = z.object({
	id: z.string(),
	title: z.string().min(1, { message: 'Required field' })
});

export const deleteWorkspaceSchema = z.object({
	id: z.string().min(1, { message: 'Required field' })
});
