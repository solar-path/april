import { db } from '$lib/database/db';
import { controlTable, matrixTable, processTable, riskTable } from '$lib/database/schema/rcm';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteMatrixSchema, matrixSchema } from './matrix.schema';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';
import { eq } from 'drizzle-orm';
import { companyTable, departmentTable, positionTable } from '$lib/database/schema/entity';
import { getWorkspaceBySlug } from '$lib/helpers/getWorkspace';

export const load = async (event) => {
	const currentWorkspace = await getWorkspaceBySlug(event.params.slug);

	const processList = currentWorkspace
		? await db
				.select({ id: processTable.id, title: processTable.title, parentId: processTable.parentId })
				.from(processTable)
				.where(eq(processTable.workspaceId, currentWorkspace.id))
				.then((rows) => rows.map((row) => ({ ...row, children: [] })))
		: []; // Add an empty children array to each object

	const companyList = currentWorkspace
		? await db
				.select({
					id: companyTable.id,
					title: companyTable.title
				})
				.from(companyTable)
				.where(eq(companyTable.workspaceId, currentWorkspace.id))
		: [];

	const departmentList = currentWorkspace
		? await db
				.select({
					id: departmentTable.id,
					title: departmentTable.title
				})
				.from(departmentTable)
				.where(eq(departmentTable.workspaceId, currentWorkspace.id))
		: [];

	const positionList = currentWorkspace
		? await db
				.select({
					id: positionTable.id,
					title: positionTable.title,
					departmentId: positionTable.departmentId,
					departmentTitle: departmentTable.title
				})
				.from(positionTable)
				.leftJoin(departmentTable, eq(positionTable.departmentId, departmentTable.id))
				.where(eq(positionTable.workspaceId, currentWorkspace.id))
		: [];

	const matrixList = currentWorkspace
		? await db
				.select({
					id: matrixTable.id,
					// companyId: matrixTable.companyId,
					company: companyTable.title,
					// processId: matrixTable.processId,
					process: processTable.title,
					// riskId: matrixTable.riskId,
					risk: riskTable.title,
					// controlId: matrixTable.controlId,
					control: controlTable.title,
					description: matrixTable.description,
					frequency: matrixTable.frequency,
					type: matrixTable.type,
					execution: matrixTable.execution,
					// controlOwnerId: matrixTable.controlOwnerId,
					controlOwner: positionTable.title,
					author: matrixTable.author,
					createdAt: matrixTable.createdAt,
					updatedAt: matrixTable.updatedAt
				})
				.from(matrixTable)
				.leftJoin(companyTable, eq(matrixTable.companyId, companyTable.id))
				.leftJoin(processTable, eq(matrixTable.processId, processTable.id))
				.leftJoin(riskTable, eq(matrixTable.riskId, riskTable.id))
				.leftJoin(controlTable, eq(matrixTable.controlId, controlTable.id))
				.leftJoin(positionTable, eq(matrixTable.controlOwnerId, positionTable.id))
				.where(eq(matrixTable.workspaceId, currentWorkspace.id))
		: [];

	return {
		companyList,
		departmentList,
		positionList,
		processList,
		processTree: buildTree(processList),
		controlList: await db.select().from(controlTable),
		riskList: await db.select().from(riskTable),
		matrixForm: await superValidate(zod(matrixSchema)),
		matrixList
	};
};

export const actions = {
	createMatrix: async (event) => {
		const currentWorkspace = await getWorkspaceBySlug(event.params.slug);

		console.log('createMatrix endpoint was achieved');
		const form = await superValidate(await event.request.formData(), zod(matrixSchema));

		if (!form.valid) {
			console.log('form is not valid =>', form);
			return fail(400, { form });
		}
		console.log('form is valid', form);

		if (currentWorkspace) {
			await db.insert(matrixTable).values({
				id: crypto.randomUUID(),
				companyId: form.data.companyId,
				processId: form.data.processId,
				riskId: form.data.riskId,
				controlId: form.data.controlId,
				description: form.data.description,
				frequency: form.data.frequency,
				type: form.data.type,
				execution: form.data.execution,
				controlOwnerId: form.data.controlOwnerId,
				author: event.locals.user?.id,
				workspaceId: currentWorkspace.id
			});
		}

		return { form };
	},
	updateMatrix: async (event) => {
		console.log('updateMatrix endpoint was achieved');
		const form = await superValidate(await event.request.formData(), zod(matrixSchema));
		if (!form.valid) {
			console.log('form is not valid');
			return fail(400, { form });
		}
		console.log('/dashboard/+page.server.ts :: updateMatrix :: form => ', form);

		return { form };
	},
	deleteMatrix: async (event) => {
		console.log('deleteMatrix endpoint was achieved');
		const form = await superValidate(await event.request.formData(), zod(deleteMatrixSchema));
		if (!form.valid) {
			console.log('form is not valid', form);
			return fail(400, { form });
		}
		console.log('/dashboard/+page.server.ts :: deleteMatrix :: form => ', form);

		return { form };
	}
};
