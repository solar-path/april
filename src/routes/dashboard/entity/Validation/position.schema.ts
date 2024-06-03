import { db } from '$lib/database/db';
import { companyTable, departmentTable } from '$lib/database/schema/entity';
import { z } from 'zod';

const companies = await db.select().from(companyTable);
const departments = await db.select().from(departmentTable);

export const positionSchema = z.object({
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
		),
	departmentId: z
		.string()
		.min(1, { message: 'Required field' })
		.refine(
			(value) => {
				const validItems = departments.map((unit) => unit.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid department' }
		)
});

export const deletePositionSchema = z.object({
	id: z.string().min(1, { message: 'Required field' })
});
