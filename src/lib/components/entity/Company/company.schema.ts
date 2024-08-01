import { db } from '$lib/database/db';
import { workspaceTable } from '$lib/database/schema/entity';
import { industryTable } from '$lib/database/schema/industry';
import { ne } from 'drizzle-orm';
import { z } from 'zod';

const workspaces = await db.select().from(workspaceTable);

const industries = await db
	.select({
		id: industryTable.id,
		title: industryTable.name
	})
	.from(industryTable)
	.where(ne(industryTable.parentId, ''));

export const companySchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, { message: 'Required field' }),
	description: z.string().optional(),
	logo: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 1_000_000, 'Max 1 MB upload size.')
		.optional(),
	type: z.enum(['company', 'counterparty']),
	workspaceId: z.string(),
	workspace: z
		.string()
		.min(1, { message: 'Required field' })
		.refine(
			(value) => {
				const validItems = workspaces.map((unit) => unit.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid workspace' }
		),

	industryId: z.string(),
	industry: z
		.string()
		.min(1, { message: 'Required field' })
		.refine(
			(value) => {
				const validItems = industries.map((unit) => unit.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid industry' }
		),
	BIN: z.string().min(1, { message: 'Required field' })
});

export const deleteCompanySchema = z.object({
	id: z.string().min(1, { message: 'Required field' })
});
