import { redirect } from '@sveltejs/kit';
import { fail, superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/database/db';
import {
	companyTable,
	departmentTable,
	positionTable,
	regionTable,
	workspaceTable
} from '$lib/database/schema/entity';

import { deleteWorkspaceSchema, workspaceSchema } from '$lib/components/Workspace/workspace.schema';
import { deleteRegionSchema, regionSchema } from '../../routes/[slug]/entity/region/region.schema';
import { companySchema, deleteCompanySchema } from '../../routes/[slug]/entity/company/company.schema';
import { deleteDepartmentSchema, departmentSchema } from '../../routes/[slug]/entity/department/department.schema';
import { deletePositionSchema, positionSchema } from '../../routes/[slug]/entity/position/position.schema';
import { addressTable } from '$lib/database/schema/address';
import { eq, and } from 'drizzle-orm';
import { contactTable } from '$lib/database/schema/contact';
import { countryTable } from '$lib/database/schema/country';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';
import { fileProcessor } from '$lib/helpers/fileProcessor';
import { industryTable } from '$lib/database/schema/industry';
import { slugify } from '$lib/helpers/slugify';

export const load = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/login');
	}

	const workspaceList = await db
		.select({
			id: workspaceTable.id,
			title: workspaceTable.title,
			description: workspaceTable.description,
			slug: workspaceTable.slug,
			author: workspaceTable.author
		})
		.from(workspaceTable)
		.where(
			and(
				eq(workspaceTable.author, event.locals.user.id),
				eq(workspaceTable.slug, event.params.slug)
			)
		);

	const regionList = await db
		.select({
			id: regionTable.id,
			title: regionTable.title,
			workspaceId: regionTable.workspaceId,
			description: regionTable.description,
			author: regionTable.author
		})
		.from(regionTable)
		.leftJoin(workspaceTable, eq(workspaceTable.id, regionTable.workspaceId))
		.where(eq(regionTable.author, event.locals.user.id));

	const companyList = await db
		.select({
			id: companyTable.id,
			title: companyTable.title,
			description: companyTable.description,
			workspaceId: companyTable.workspaceId,
			logo: companyTable.logo,
			author: companyTable.author,
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
		.where(and(eq(companyTable.type, 'company'), eq(companyTable.author, event.locals.user.id)))
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
			companyId: departmentTable.companyId,
			author: departmentTable.author
		})
		.from(departmentTable)
		.where(eq(departmentTable.author, event.locals.user.id))
		.leftJoin(companyTable, eq(companyTable.id, departmentTable.companyId));

	const positionList = await db
		.select({
			id: positionTable.id,
			description: positionTable.description,
			title: positionTable.title,
			departmentId: positionTable.departmentId,
			companyId: positionTable.companyId,
			author: positionTable.author
		})
		.from(positionTable)
		.where(eq(positionTable.author, event.locals.user.id))
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

export const actions = {
	// WORKSPACE CRUD
	createWorkspace: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(workspaceSchema));

		const userID = event.locals.user?.id;
		if (!form.valid) {
			console.log('/entity/+page.server.ts :: create workspace form is not valid => ', form);
			return fail(400, { form });
		}

		await db.insert(workspaceTable).values({
			id: crypto.randomUUID(),
			title: form.data.title,
			description: form.data.description,
			slug: await slugify(form.data.title),
			author: userID
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
		// return { form };
		redirect(302, `/`);
	},
	
	
	
	
};
