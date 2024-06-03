import { db } from '$lib/database/db';
import { companyTable } from '$lib/database/schema/entity';
import { z } from 'zod';

const companies = await db.select().from(companyTable);

export const departmentSchema = z.object({
	id: z.string(),
	title: z.string().min(1, { message: 'Required field' }),
	companyId: z
		.string()
		.min(1, { message: 'Required field' })
		.refine(
			(value) => {
				const validItems = companies.map((unit) => unit.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid workspace' }
		)
});

export const deleteDepartmentSchema = z.object({
	id: z.string().min(1, { message: 'Required field' })
});
