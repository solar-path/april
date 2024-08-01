import { db } from '$lib/database/db';
import { workspaceTable } from '$lib/database/schema/entity';
import { z } from 'zod';

const workspaces = await db.select().from(workspaceTable);
const validItems = workspaces.map((unit) => unit.title.toLowerCase());
console.log('Valid workspace titles:', validItems);

export const regionSchema = z.object({
	id: z.string(),
	title: z.string().min(1, { message: 'Required field' }),
	description: z.string().optional(),
	workspaceId: z.string(),
	workspace: z
		.string()
		.min(1, { message: 'Required field' })
		.refine(
			(value) => {
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid workspace' }
		)
});

export const deleteRegionSchema = z.object({
	id: z.string().min(1, { message: 'Required field' })
});
