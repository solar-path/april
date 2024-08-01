import { z } from 'zod';

export const workspaceSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, { message: 'Required field' }),
	description: z.string().optional(),
	logo: z
		.instanceof(File, { message: 'Please upload a valid file.' })
		.refine((f) => f.size < 500_000, 'Max 500 kB upload size.')
		.nullable()
});

export const deleteWorkspaceSchema = z.object({
	id: z.string().min(1, { message: 'Required field' })
});
