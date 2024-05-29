import { db } from '$lib/database/db';
import { controlTable, matrixTable, processTable, riskTable } from '$lib/database/schema/rcm';
import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteMatrixSchema, matrixSchema } from './matrix.schema';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';
import { entityTable } from '$lib/database/schema/entity';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const processList = await db
		.select({ id: processTable.id, title: processTable.title, parentId: processTable.parentId })
		.from(processTable)
		.then((rows) => rows.map((row) => ({ ...row, children: [] }))); // Add an empty children array to each object

	const units = await db
		.select({
			id: entityTable.id,
			title: entityTable.title,
			parentId: entityTable.parentId,
			type: entityTable.type
		})
		.from(entityTable)
		.then((rows) => rows.map((row) => ({ ...row, children: [] }))); // Add an empty children array to each object

	const entityList = units.filter((item) => item.type === 'company');
	const positionList = units.filter((item) => item.type === 'position');

	const matrixList = await db
		.select({
			id: matrixTable.id,
			entityId: matrixTable.entityId,
			entityTitle: entityTable.title,
			processId: matrixTable.processId,
			processTitle: processTable.title,
			riskId: matrixTable.riskId,
			riskTitle: riskTable.title,
			controlId: matrixTable.controlId,
			controlTitle: controlTable.title,
			description: matrixTable.description,
			frequency: matrixTable.frequency,
			type: matrixTable.type,
			execution: matrixTable.execution,
			controlOwner: matrixTable.controlOwner,
			controlOwnerTitle: entityTable.title,
			author: matrixTable.author,
			createdAt: matrixTable.createdAt,
			updatedAt: matrixTable.updatedAt
		})
		.from(matrixTable)
		.leftJoin(entityTable.as('entity'), eq(matrixTable.entityId, entityTable.id))
		.leftJoin(processTable, eq(matrixTable.processId, processTable.id))
		.leftJoin(riskTable, eq(matrixTable.riskId, riskTable.id))
		.leftJoin(controlTable, eq(matrixTable.controlId, controlTable.id))
		.leftJoin(entityTable.as('controlOwner'), eq(matrixTable.controlOwner, entityTable.id));

	return {
		entityList,
		entityTree: buildTree(entityList),
		positionList,
		positionTree: buildTree(positionList),
		processList,
		processTree: buildTree(processList),
		controlList: await db.select().from(controlTable),
		riskList: await db.select().from(riskTable),
		matrixForm: await superValidate(zod(matrixSchema)),
		matrixList
	};
};

export const actions: Actions = {
	createMatrix: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(matrixSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
		await db.insert(matrixTable).values({
			id: crypto.randomUUID(),
			entityId: form.data.entityId,
			processId: form.data.processId,
			riskId: form.data.riskId,
			controlId: form.data.controlId,
			description: form.data.description,
			frequency: form.data.frequency,
			type: form.data.type,
			execution: form.data.execution,
			controlOwner: form.data.controlOwnerId,
			author: event.locals.user?.id
		});

		return { form };
	},
	updateMatrix: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(matrixSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		console.log('/dashboard/+page.server.ts :: updateMatrix :: form => ', form);
	},
	deleteMatrix: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(deleteMatrixSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		console.log('/dashboard/+page.server.ts :: deleteMatrix :: form => ', form);
	}
};
