import { db } from '$lib/database/db';
import { processTable } from '$lib/database/schema/rcm';
import { z } from 'zod';

const processes = await db
	.select({
		id: processTable.id,
		title: processTable.title
	})
	.from(processTable);

export const processSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, { message: 'Field cannot be blank' }),
	code: z.string().optional(),
	parentId: z.string().optional(),
	parent: z
		.string()
		.optional()
		.refine(
			(value) => {
				const validItems = processes.map((process) => process.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid process' }
		),
	description: z.string().min(1, { message: 'Field cannot be blank' })
});

export const processDeleteSchema = z.object({
	id: z.string()
});
