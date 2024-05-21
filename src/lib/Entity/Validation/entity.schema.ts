import { z } from 'zod';
import { entityTable, entityTypes } from '$lib/database/schema/entity';
import { db } from '$lib/database/db';

const units = await db
	.select({
		id: entityTable.id,
		title: entityTable.title
	})
	.from(entityTable);

export const entitySchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, { message: 'Required field' }),
	type: z.enum(entityTypes),
	parentId: z.string().optional(),
	parent: z
		.string()
		.optional()
		.refine(
			(value) => {
				const validItems = units.map((unit) => unit.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid structure unit' }
		)

	// Add other fields as necessary
});

export const entityDeleteSchema = z.object({
	id: z.string()
});
