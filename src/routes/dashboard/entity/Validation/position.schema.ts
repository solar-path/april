import { db } from '$lib/database/db';
import { companyTable, departmentTable } from '$lib/database/schema/entity';
import { z } from 'zod';

const companies = await db.select().from(companyTable);
const departments = await db.select().from(departmentTable);

export const positionSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, { message: 'Required field' }),
	description: z.string().optional(),
	companyId: z.string(),
	company: z
		.string()
		.min(1, { message: 'Required field' })
		.refine(
			(value) => {
				const validItems = companies.map((unit) => unit.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid company' }
		),
	departmentId: z.string(),
	department: z
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
