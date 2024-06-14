import { db } from '$lib/database/db';
import { controlTable, processTable, riskTable } from '$lib/database/schema/rcm';
import { z } from 'zod';
import { companyTable, positionTable } from '$lib/database/schema/entity';

const processes = await db
	.select({
		id: processTable.id,
		title: processTable.title
	})
	.from(processTable);

const controls = await db
	.select({
		id: controlTable.id,
		title: controlTable.title
	})
	.from(controlTable);

const risks = await db
	.select({
		id: riskTable.id,
		title: riskTable.title
	})
	.from(riskTable);

const companies = await db
	.select({
		id: companyTable.id,
		title: companyTable.title
	})
	.from(companyTable);

const positions = await db
	.select({
		id: positionTable.id,
		title: positionTable.title
	})
	.from(positionTable);

export const matrixSchema = z.object({
	id: z.string().optional(),
	riskId: z.string(),
	risk: z
		.string()
		.min(1, { message: 'Field is required' })
		.refine(
			(value) => {
				const validItems = risks.map((risk) => (risk.title ? risk.title.toLowerCase() : ''));
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid risk' }
		),
	controlId: z.string(),
	control: z
		.string()
		.min(1, { message: 'Field is required' })
		.refine(
			(value) => {
				const validItems = controls.map((control) =>
					control.title ? control.title.toLowerCase() : ''
				);
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid control' }
		),
	processId: z.string().optional(),
	process: z
		.string()
		.min(1, { message: 'Field is required' })
		.refine(
			(value) => {
				const validItems = processes.map((process) => process.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid process' }
		),
	companyId: z.string().optional(),
	company: z
		.string()
		.min(1, { message: 'Field is required' })
		.refine(
			(value) => {
				const validItems = companies.map((company) => company.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid company' }
		),
	controlOwner: z.string().optional(),
	controlOwnerId: z
		.string()
		.min(1, { message: 'Field is required' })
		.refine(
			(value) => {
				const validItems = positions.map((position) => position.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid position' }
		),
	description: z.string().min(1, { message: 'Field is required' }),
	frequency: z.enum(['On-demand', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually']),
	type: z.enum(['Preventive', 'Detective', 'SoD']),
	execution: z.enum(['Manual', 'IT-Dependend', 'Automated'])
});

export const deleteMatrixSchema = z.object({
	id: z.string()
});
