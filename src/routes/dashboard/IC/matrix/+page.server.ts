import { db } from '$lib/database/db';
import { controlTable, matrixTable, processTable, riskTable } from '$lib/database/schema/rcm';
import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteMatrixSchema, matrixSchema } from './matrix.schema';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';
import { entityTable } from '$lib/database/schema/entity';

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
		matrixList: await db.select().from(matrixTable)
	};
};

export const actions: Actions = {
	createMatrix: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(matrixSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		console.log('/dashboard/+page.server.ts :: createMatrix :: form => ', form);
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
