import { db } from '$lib/database/db';
import { controlTable, matrixTable, processTable, riskTable } from '$lib/database/schema/rcm';
import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';
import { entityTable } from '$lib/database/schema/entity';
import { riskDeleteSchema, riskSchema } from '$lib/IC/Validation/risk.schema';
import { controlDeleteSchema, controlSchema } from '$lib/IC/Validation/control.schema';
import { processDeleteSchema, processSchema } from '$lib/IC/Validation/process.schema';
import { deleteMatrixSchema, matrixSchema } from '$lib/IC/Validation/matrix.schema';

export const load: PageServerLoad = async () => {
	const processList = await db.select().from(processTable);
	const entityList = await db.select().from(entityTable);
	return {
		// RISK
		riskList: await db.select().from(riskTable),
		riskForm: await superValidate(zod(riskSchema)),
		// CONTROL
		controlList: await db.select().from(controlTable),
		controlForm: await superValidate(zod(controlSchema)),
		// PROCESS
		processList,
		processTree: buildTree(processList),
		processForm: await superValidate(zod(processSchema)),
		// MATRIX
		matrixForm: await superValidate(zod(matrixSchema)),
		matrixList: await db.select().from(matrixTable),
		// ENTITY
		entityList,
		entityTree: buildTree(entityList)
	};
};

export const actions: Actions = {
	createRisk: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(riskSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		let id = crypto.randomUUID();
		await db.insert(riskTable).values({
			id: id,
			code: `R${id.split('-')[1]}`,
			title: form.data.title,
			author: event.locals.user?.id
		});

		return { form };
	},
	createControl: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(controlSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		let id = crypto.randomUUID();
		await db.insert(controlTable).values({
			id: id,
			code: `R${id.split('-')[1]}`,
			title: form.data.title,
			description: form.data.description,
			author: event.locals.user?.id
		});

		return { form };
	},
	createProcess: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(processSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		let id = crypto.randomUUID();
		await db.insert(processTable).values({
			id: id,
			code: `P${id.split('-')[1]}`,
			title: form.data.title,
			parentId: form.data.parentId,
			description: form.data.description,
			author: event.locals.user?.id
		});

		return { form };
	},
	deleteRisk: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(riskDeleteSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		await db.delete(riskTable).where(eq(riskTable.code, form.data.code));
		return { form };
	},

	deleteControl: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(controlDeleteSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		await db.delete(controlTable).where(eq(controlTable.code, form.data.code));
		return { form };
	},
	deleteProcess: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(processDeleteSchema));
		console.log('/dashboard/+page.server.ts :: deleteProcess :: form => ', form);
		if (!form.valid) {
			return fail(400, { form });
		}
		await db.delete(processTable).where(eq(processTable.id, form.data.id));
		// console.log('/dashboard/+page.server.ts :: deleteProcess :: id => ', form.data.id);
		// console.log('process was deleted');
		return { form };
	},
	updateRisk: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(riskSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		let risk = await db.select().from(riskTable).where(eq(riskTable.id, form.data.id));
		if (risk.length === 0 || !risk) {
			return fail(400, { form });
		}
		await db
			.update(riskTable)
			.set({
				title: form.data.title
			})
			.where(eq(riskTable.id, form.data.id));

		return { form };
	},
	updateControl: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(controlSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		let control = await db.select().from(controlTable).where(eq(controlTable.id, form.data.id));
		if (control.length === 0 || !control) {
			return fail(400, { form });
		}
		await db
			.update(controlTable)
			.set({
				title: form.data.title,
				description: form.data.description
			})
			.where(eq(controlTable.id, form.data.id));

		return { form };
	},
	updateProcess: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(processSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		await db
			.update(processTable)
			.set({
				title: form.data.title,
				description: form.data.description,
				parentId: form.data.parentId
			})
			.where(eq(processTable.id, form.data.id));

		return { form };
	},
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
