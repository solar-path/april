import { db } from '$lib/database/db';
import { regionTable, workspaceTable } from '$lib/database/schema/entity';
import { z } from 'zod';

const workspaces = await db.select().from(workspaceTable);
const regions = await db.select().from(regionTable);

export const companySchema = z.object({
	id: z.string(),
	title: z.string().min(1, { message: 'Required field' }),
	logo: z.string().optional(),
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
	regionId: z.string(),
	region: z
		.string()
		.min(1, { message: 'Required field' })
		.refine(
			(value) => {
				const validItems = regions.map((unit) => unit.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid region' }
		),
	BIN: z.string().min(1, { message: 'Required field' }),
	address: z.object({
		country: z.string().min(1, { message: 'Required field' }),
		countryId: z.string().min(1, { message: 'Required field' }),
		city: z.string().min(1, { message: 'Required field' }),
		state: z.string().min(1, { message: 'Required field' }),
		zipcode: z.string().min(1, { message: 'Required field' }),
		addressLine: z.string().min(1, { message: 'Required field' })
	})
});

export const deleteCompanySchema = z.object({
	id: z.string().min(1, { message: 'Required field' })
});
