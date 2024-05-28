import { db } from '$lib/database/db';
import { entityTable } from '$lib/database/schema/entity';
import {
	controlTable,
	controlType,
	executionType,
	frequencyTypes,
	processTable,
	riskTable
} from '$lib/database/schema/rcm';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

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

const entities = await db
	.select({
		id: entityTable.id,
		title: entityTable.title
	})
	.from(entityTable)
	.where(eq(entityTable.type, 'company'));

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
	processId: z.string(),
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

	entityId: z.string(),
	entity: z
		.string()
		.min(1, { message: 'Field is required' })
		.refine(
			(value) => {
				const validItems = entities.map((entity) => entity.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid process' }
		),
	description: z.string().min(1, { message: 'Field is required' }),
	frequency: z.enum(frequencyTypes),
	type: z.enum(controlType),
	execution: z.enum(executionType),
	controlOwner: z.string().optional()
});

export const deleteMatrixSchema = z.object({
	id: z.string()
});
