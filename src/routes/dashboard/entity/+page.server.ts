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

import { deleteWorkspaceSchema, workspaceSchema } from './Validation/workspace.schema';
import { deleteRegionSchema, regionSchema } from './Validation/region.schema';
import { companySchema } from './Validation/company.schema';
import { departmentSchema } from './Validation/department.schema';
import { positionSchema } from './Validation/position.schema';
import { addressTable } from '$lib/database/schema/address';
import { eq } from 'drizzle-orm';
import { contactTable } from '$lib/database/schema/contact';
import { countryTable } from '$lib/database/schema/country';
import { industryTable } from '$lib/database/schema/industry';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/login');
	}

	const workspaceList = await db
		.select({
			id: workspaceTable.id,
			title: workspaceTable.title,
			description: workspaceTable.description
		})
		.from(workspaceTable);

	const regionList = await db
		.select({
			id: regionTable.id,
			title: regionTable.title,
			workspaceId: regionTable.workspaceId,
			description: regionTable.description
		})
		.from(regionTable)
		.leftJoin(workspaceTable, eq(workspaceTable.id, regionTable.workspaceId));

	const companyList = await db
		.select({
			id: companyTable.id,
			title: companyTable.title,
			description: companyTable.description,
			workspaceId: companyTable.workspaceId,
			logo: companyTable.logo,
			industryId: companyTable.industryId,
			BIN: companyTable.BIN,
			type: companyTable.type,
			// address: companyTable.address,
			address: {
				id: addressTable.id,
				city: addressTable.city,
				state: addressTable.state,
				zipcode: addressTable.zipcode,
				addressLine: addressTable.addressLine,
				countryName: countryTable.name // Change the key to avoid conflict
			},
			contact: {
				id: contactTable.id,
				email: contactTable.email,
				phone: contactTable.phone,
				website: contactTable.website
			},
			regionId: companyTable.regionId
		})
		.from(companyTable)
		.where(eq(companyTable.type, 'company'))
		.leftJoin(regionTable, eq(regionTable.id, companyTable.regionId))
		.leftJoin(addressTable, eq(addressTable.id, companyTable.address))
		.leftJoin(contactTable, eq(contactTable.id, companyTable.contact))
		.leftJoin(countryTable, eq(countryTable.id, addressTable.countryId));

	const departmentList = await db
		.select({
			id: departmentTable.id,
			description: departmentTable.description,
			title: departmentTable.title,
			companyId: departmentTable.companyId
		})
		.from(departmentTable)
		.leftJoin(companyTable, eq(companyTable.id, departmentTable.companyId));

	const positionList = await db
		.select({
			id: positionTable.id,
			description: positionTable.description,
			title: positionTable.title,
			departmentId: positionTable.departmentId,
			companyId: positionTable.companyId
		})
		.from(positionTable)
		.leftJoin(departmentTable, eq(departmentTable.id, positionTable.departmentId))
		.leftJoin(companyTable, eq(companyTable.id, positionTable.companyId));

	const tree = workspaceList.map((workspace) => {
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
								return { ...department, children: departmentPositions, type: 'department' };
							});
						return { ...company, children: companyDepartments, type: 'company' };
					});
				return { ...region, children: regionCompanies, type: 'region' };
			});
		return { ...workspace, children: workspaceRegions, type: 'workspace' };
	});

	const industryList = await db
		.select({
			id: industryTable.id,
			title: industryTable.name,
			description: industryTable.description,
			parentId: industryTable.parentId
		})
		.from(industryTable);

	const industryListWithChildren = industryList.map((industry) => ({
		...industry,
		children: []
	}));

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
		positionForm: await superValidate(zod(positionSchema)),
		industryList: industryListWithChildren,
		industryTree: buildTree(industryListWithChildren)
	};
};

export const actions: Actions = {
	// WORKSPACE CRUD
	createWorkspace: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(workspaceSchema));

		if (!form.valid) {
			console.log('/entity/+page.server.ts :: create workspace form is not valid => ', form);
			return fail(400, { form });
		}

		await db.insert(workspaceTable).values({
			id: crypto.randomUUID(),
			title: form.data.title,
			description: form.data.description,
			author: event.locals.user?.id as string
		});

		return { form };
	},
	updateWorkspace: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(workspaceSchema));

		if (!form.valid) {
			return fail(400, { form });
		} else {
			const record = await db
				.select()
				.from(workspaceTable)
				.where(eq(workspaceTable.id, form.data.id as string));

			await db
				.update(workspaceTable)
				.set({
					title: form.data.title !== record[0].title ? form.data.title : record[0].title,
					description:
						form.data.description !== record[0].description
							? form.data.description
							: record[0].description
				})
				.where(eq(workspaceTable.id, form.data.id as string));
			return { form };
		}
	},
	deleteWorkspace: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(deleteWorkspaceSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		if (form.data.id === undefined) {
			return fail(400, { error: 'Workspace ID is undefined' });
		}
		await db.delete(workspaceTable).where(eq(workspaceTable.id, form.data.id));
		return { form };
	},
	// REGION CRUD
	createRegion: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(regionSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await db.insert(regionTable).values({
			id: crypto.randomUUID(),
			title: form.data.title,
			description: form.data.description,
			workspaceId: form.data.workspaceId,
			author: event.locals.user?.id as string
		});

		return { form };
	},
	updateRegion: async (event) => {
		console.log('update region endpoint achived');
		const form = await superValidate(await event.request.formData(), zod(regionSchema));
		if (!form.valid) {
			return fail(400, { form });
		} else {
			const record = await db
				.select()
				.from(regionTable)
				.where(eq(regionTable.id, form.data.id as string));

			await db
				.update(regionTable)
				.set({
					title: form.data.title !== record[0].title ? form.data.title : record[0].title,
					description:
						form.data.description !== record[0].description
							? form.data.description
							: record[0].description,
					workspaceId:
						form.data.workspaceId !== record[0].workspaceId
							? form.data.workspaceId
							: record[0].workspaceId
				})
				.where(eq(regionTable.id, form.data.id as string));
		}
		return { form };
	},
	deleteRegion: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(deleteRegionSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		await db.delete(regionTable).where(eq(regionTable.id, form.data.id as string));
		return { form };
	},
	// COMPANY CRUD
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
	// DEPARTMENT CRUD
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
	// POSITION CRUD
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
