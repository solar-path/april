import { redirect } from '@sveltejs/kit';
import { fail, superValidate, withFiles } from 'sveltekit-superforms';
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
import { companySchema, deleteCompanySchema } from './Validation/company.schema';
import { deleteDepartmentSchema, departmentSchema } from './Validation/department.schema';
import { deletePositionSchema, positionSchema } from './Validation/position.schema';
import { addressTable } from '$lib/database/schema/address';
import { eq } from 'drizzle-orm';
import { contactTable } from '$lib/database/schema/contact';
import { countryTable } from '$lib/database/schema/country';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';
import { fileProcessor } from '$lib/helpers/fileProcessor';
import { industryTable } from '$lib/database/schema/industry';

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
			industry: {
				id: companyTable.industryId,
				title: industryTable.name,
				description: industryTable.description
			},
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
		.leftJoin(countryTable, eq(countryTable.id, addressTable.countryId))
		.leftJoin(industryTable, eq(industryTable.id, companyTable.industryId));

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

	const industryData = await db
		.select({
			id: industryTable.id,
			title: industryTable.name,
			description: industryTable.description,
			parentId: industryTable.parentId
		})
		.from(industryTable);

	const industryListWithChildren = industryData.map((industry) => ({
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
		industryList: industryData.filter((industry) => industry.description !== ''),
		industryTree: buildTree(industryListWithChildren),
		countryList: await db
			.select({
				id: countryTable.id,
				title: countryTable.name
			})
			.from(countryTable)
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
			console.log('form is not valid => ', form);
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
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}
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
			console.log('invalid form => ', form);
			if (!form.valid) return fail(400, withFiles({ form }));
		}

		const checkCompany = await db
			.select()
			.from(companyTable)
			.where(eq(companyTable.title, form.data.title.trim() as string));

		if (checkCompany.length > 0) {
			return fail(400, { form, error: 'Company already exists' });
		}

		await db.insert(companyTable).values({
			id: crypto.randomUUID(),
			title: form.data.title.trim(),
			description: form.data.description?.trim(),
			logo: form.data.logo instanceof File ? await fileProcessor(form.data.logo, 'logo') : '',
			type: 'company', // Ensure this is a valid value
			regionId: form.data.regionId,
			workspaceId: form.data.workspaceId,
			industryId: form.data.industryId,
			BIN: form.data.BIN.trim().toUpperCase(),
			author: event.locals.user?.id as string
		});

		return withFiles({ form });
	},
	updateCompany: async (event) => {
		console.log('update company endpoint reached');
		const form = await superValidate(await event.request.formData(), zod(companySchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}
		return { form };
	},
	deleteCompany: async (event) => {
		console.log('delete company endpoint reached');
		const form = await superValidate(await event.request.formData(), zod(deleteCompanySchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}
		const record = await db
			.select()
			.from(companyTable)
			.where(eq(companyTable.id, form.data.id as string));

		if (record.length === 0) {
			return fail(400, { form, error: 'Company not found' });
		}

		await db.delete(companyTable).where(eq(companyTable.id, form.data.id as string));
		return { form };
	},
	// DEPARTMENT CRUD
	createDepartment: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(departmentSchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}

		await db.insert(departmentTable).values({
			id: crypto.randomUUID(),
			title: form.data.title,
			description: form.data.description,
			companyId: form.data.companyId,
			author: event.locals.user?.id as string
		});

		return { form };
	},
	updateDepartment: async (event) => {
		console.log('update department endpoint reached');
		const form = await superValidate(await event.request.formData(), zod(departmentSchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}

		const record = await db
			.select()
			.from(departmentTable)
			.where(eq(departmentTable.id, form.data.id as string));

		if (record.length === 0) {
			return fail(400, { form, error: 'Department not found' });
		}

		await db
			.update(departmentTable)
			.set({
				title: record[0].title !== form.data.title ? form.data.title : record[0].title,
				description:
					record[0].description !== form.data.description
						? form.data.description
						: record[0].description,
				companyId:
					record[0].companyId !== form.data.companyId ? form.data.companyId : record[0].companyId
			})
			.where(eq(departmentTable.id, form.data.id as string));

		return { form };
	},
	deleteDepartment: async (event) => {
		console.log('delete department endpoint reached');
		const form = await superValidate(await event.request.formData(), zod(deleteDepartmentSchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}

		await db.delete(departmentTable).where(eq(departmentTable.id, form.data.id as string));

		return { form };
	},
	// POSITION CRUD
	createPosition: async (event) => {
		console.log('create position endpoint reached');
		const form = await superValidate(await event.request.formData(), zod(positionSchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}

		await db.insert(positionTable).values({
			id: crypto.randomUUID(),
			title: form.data.title,
			description: form.data.description,
			departmentId: form.data.departmentId,
			companyId: form.data.companyId,
			author: event.locals.user?.id as string
		});
		return { form };
	},
	updatePosition: async (event) => {
		console.log('update position endpoint reached');
		const form = await superValidate(await event.request.formData(), zod(positionSchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}
		const record = await db
			.select()
			.from(positionTable)
			.where(eq(positionTable.id, form.data.id as string));

		await db
			.update(positionTable)
			.set({
				title: record[0].title !== form.data.title ? form.data.title : record[0].title,
				description:
					record[0].description !== form.data.description
						? form.data.description
						: record[0].description,
				departmentId:
					record[0].departmentId !== form.data.departmentId
						? form.data.departmentId
						: record[0].departmentId,
				companyId:
					record[0].companyId !== form.data.companyId ? form.data.companyId : record[0].companyId
			})
			.where(eq(positionTable.id, form.data.id as string));
		return { form };
	},
	deletePosition: async (event) => {
		console.log('delete position endpoint reached');
		const form = await superValidate(await event.request.formData(), zod(deletePositionSchema));
		if (!form.valid) {
			console.log('form is not valid => ', form);
			return fail(400, { form });
		}

		const record = await db
			.select()
			.from(positionTable)
			.where(eq(positionTable.id, form.data.id as string));

		if (record.length === 0) {
			return fail(400, { form, error: 'Position not found' });
		}

		await db.delete(positionTable).where(eq(positionTable.id, form.data.id as string));
		return { form };
	}
};
