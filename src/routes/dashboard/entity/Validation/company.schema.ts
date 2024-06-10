import { db } from '$lib/database/db';
import { countryTable } from '$lib/database/schema/country';
import { regionTable, workspaceTable } from '$lib/database/schema/entity';
import { industryTable } from '$lib/database/schema/industry';
import { ne } from 'drizzle-orm';
import { z } from 'zod';

const workspaces = await db.select().from(workspaceTable);
const regions = await db.select().from(regionTable);

const industries = await db
	.select({
		id: industryTable.id,
		title: industryTable.name
	})
	.from(industryTable)
	.where(ne(industryTable.parentId, ''));

const countries = await db.select().from(countryTable);

export const companySchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, { message: 'Required field' }),
	description: z.string().optional(),
	logo: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 1_000_000, 'Max 1 MB upload size.'),
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
	BIN: z.string().min(1, { message: 'Required field' }),

	countryId: z.string(),
	country: z
		.string()
		.min(1, { message: 'Required field' })
		.refine(
			(value) => {
				const validItems = countries.map((unit) => unit.name.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid country' }
		),
	// 	Address
	city: z.string().min(1, { message: 'Required field' }),
	state: z.string().min(1, { message: 'Required field' }),
	zipcode: z.string().min(1, { message: 'Required field' }),
	addressLine: z.string().min(1, { message: 'Required field' }),

	// 	Contact
	phone: z.string().min(1, { message: 'Required field' }),
	email: z.string().min(1, { message: 'Required field' }),
	website: z.string().optional()
});

export const deleteCompanySchema = z.object({
	id: z.string().min(1, { message: 'Required field' })
});
