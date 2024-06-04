import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/database/db';
import type { Actions, PageServerLoad } from './$types';
import {
	companyTable,
	departmentTable,
	positionTable,
	regionTable,
	workspaceTable
} from '$lib/database/schema/entity';

import { workspaceSchema } from './Validation/workspace.schema';
import { regionSchema } from './Validation/region.schema';
import { companySchema } from './Validation/company.schema';
import { departmentSchema } from './Validation/department.schema';
import { positionSchema } from './Validation/position.schema';
import { addressTable } from '$lib/database/schema/address';
import { eq } from 'drizzle-orm';
import { contactTable } from '$lib/database/schema/contact';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/login');
	}

	const workspaceList = await db
		.select({
			id: workspaceTable.id,
			title: workspaceTable.title
		})
		.from(workspaceTable);

	const regionList = await db
		.select({
			id: regionTable.id,
			title: regionTable.title,
			workspaceId: regionTable.workspaceId
		})
		.from(regionTable)
		.leftJoin(workspaceTable, eq(workspaceTable.id, regionTable.workspaceId));

	const companyList = await db
		.select({
			id: companyTable.id,
			title: companyTable.title,
			workspaceId: companyTable.workspaceId,
			logo: companyTable.logo,
			industryId: companyTable.industryId,
			BIN: companyTable.BIN,
			address: companyTable.address,
			contact: companyTable.contact,
			regionId: companyTable.regionId // Corrected to companyTable.regionId
		})
		.from(companyTable)
		.leftJoin(regionTable, eq(regionTable.id, companyTable.regionId)) // Corrected to companyTable.regionId
		.leftJoin(addressTable, eq(addressTable.id, companyTable.address))
		.leftJoin(contactTable, eq(contactTable.id, companyTable.contact));

	const departmentList = await db
		.select({
			id: departmentTable.id,
			title: departmentTable.title,
			companyId: departmentTable.companyId
		})
		.from(departmentTable)
		.leftJoin(companyTable, eq(companyTable.id, departmentTable.companyId));

	const positionList = await db
		.select({
			id: positionTable.id,
			title: positionTable.title,
			departmentId: positionTable.departmentId,
			companyId: positionTable.companyId
		})
		.from(positionTable)
		.leftJoin(departmentTable, eq(departmentTable.id, positionTable.departmentId))
		.leftJoin(companyTable, eq(companyTable.id, positionTable.companyId));

	const tree = workspaceList
		.map((workspace) => {
			const workspaceRegions = regionList
				.filter((region) => region.workspaceId === workspace.id)
				.map((region) => {
					const regionCompanies = companyList
						.filter((company) => company.regionId === region.id)
						.map((company) => {
							const companyDepartments = departmentList
								.filter((department) => department.companyId === company.id)
								.map((department) => {
									const departmentPositions = positionList
										.filter((position) => position.departmentId === department.id)
										.map((position) => ({ ...position, type: 'position' }));
									return departmentPositions.length > 0
										? { ...department, positions: departmentPositions, type: 'department' }
										: null;
								})
								.filter(Boolean);
							return companyDepartments.length > 0
								? { ...company, departments: companyDepartments, type: 'company' }
								: null;
						})
						.filter(Boolean);
					return regionCompanies.length > 0
						? { ...region, companies: regionCompanies, type: 'region' }
						: null;
				})
				.filter(Boolean);
			return workspaceRegions.length > 0
				? { ...workspace, regions: workspaceRegions, type: 'workspace' }
				: null;
		})
		.filter(Boolean);

	return {
		groupStructureTree: tree,
		workspaceList,
		workspaceForm: await superValidate(zod(workspaceSchema)),
		regionList,
		regionForm: await superValidate(zod(regionSchema)),
		companyList,
		companyForm: await superValidate(zod(companySchema)),
		departmentList,
		departmentForm: await superValidate(zod(departmentSchema)),
		positionList,
		positionForm: await superValidate(zod(positionSchema))
	};
};

export const actions: Actions = {
	createWorkspace: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(workspaceSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	updateWorkspace: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(workspaceSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	deleteWorkspace: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(workspaceSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	createRegion: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(regionSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	updateRegion: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(regionSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	deleteRegion: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(regionSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	createCompany: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(companySchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	updateCompany: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(companySchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	deleteCompany: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(companySchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	createDepartment: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(departmentSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	updateDepartment: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(departmentSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	deleteDepartment: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(departmentSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	createPosition: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(positionSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	updatePosition: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(positionSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	},
	deletePosition: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(positionSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	}
	// 	createUnit: async (event) => {
	// 		const form = await superValidate(await event.request.formData(), zod(entitySchema));
	// 		// Convenient validation check:
	// 		if (!form.valid) {
	// 			return fail(400, { form });
	// 		}
	// 		// await db.insert(entityTable).values({
	// 		// 	id: crypto.randomUUID(),
	// 		// 	title: form.data.title,
	// 		// 	parentId: form.data.parentId,
	// 		// 	author: event.locals.user?.id
	// 		// });
	// 		return { form };
	// 	},
	// 	updateUnit: async (event) => {
	// 		const form = await superValidate(await event.request.formData(), zod(entitySchema));
	// 		// const form = await superValidate(await request.formData(), zod(entitySchema));
	// 		// Convenient validation check:
	// 		if (!form.valid) {
	// 			return fail(400, { form });
	// 		}
	// 		// await db
	// 		// 	.update(entityTable)
	// 		// 	.set({
	// 		// 		title: form.data.title,
	// 		// 		parentId: form.data.parentId,
	// 		// 		type: form.data.type
	// 		// 	})
	// 		// 	.where(eq(entityTable.id, form.data.id));
	// 		return { form };
	// 	},
	// 	deleteUnit: async (event) => {
	// 		console.log('/dashboard/structure/+page.server.ts :: deleteUnit method reached');
	// 		const form = await superValidate(await event.request.formData(), zod(entityDeleteSchema));
	// 		console.log('/dashboard/structure/+page.server.ts :: form => ', form);
	// 		if (!form.valid) {
	// 			return fail(400, { form });
	// 		}
	// 		// await db.delete(entityTable).where(eq(entityTable.id, form.data.id));
	// 		return { form };
	// 	}
};
