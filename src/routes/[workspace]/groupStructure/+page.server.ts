import { companySchema } from '$lib/components/entity/Company/company.schema';
import { departmentSchema } from '$lib/components/entity/Department/department.schema';
import { positionSchema } from '$lib/components/entity/Position/position.schema';
import { regionSchema } from '$lib/components/entity/Region/region.schema';
import { workspaceSchema } from '$lib/components/entity/Workspace/workspace.schema';
import { buildTree } from '$lib/components/Tree/TreeView.utilities';
import { db } from '$lib/database/db';
import { addressTable } from '$lib/database/schema/address';
import { contactTable } from '$lib/database/schema/contact';
import { countryTable } from '$lib/database/schema/country';
import {
	companyTable,
	departmentTable,
	positionTable,
	regionTable,
	workspaceTable
} from '$lib/database/schema/entity';
import { industryTable } from '$lib/database/schema/industry';
import { workspaceUserTable } from '$lib/database/schema/users';
import { getWorkspaceBySlug } from '$lib/helpers/getWorkspace.js';
import { redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/login');
	}

	// get the current workspace. if fails then redirect to the home page
	const currentWorkspace = await getWorkspaceBySlug(event.params.workspace);
	if (!currentWorkspace) {
		redirect(302, '/');
	}

	// get the workspace list via the workspaceUserTable and left join with the workspaceTable,
	// i.e. currentUser (event.locals.user) might be different from the author of the workspace
	const workspaceList = await db
		.select({
			id: workspaceTable.id,
			title: workspaceTable.title,
			description: workspaceTable.description,
			workspace: workspaceTable.workspace,
			author: workspaceTable.author
		})
		.from(workspaceUserTable)
		.leftJoin(workspaceTable, eq(workspaceTable.id, workspaceUserTable.workspaceId))
		.where(
			and(
				eq(workspaceUserTable.userId, event.locals.user.id),
				eq(workspaceUserTable.workspaceId, currentWorkspace.id)
			)
		);

	// get the region list via the workspaceUserTable and left join with the workspaceTable and then the region,
	// i.e. currentUser (event.locals.user) might be different from the author of the region
	// const regionList = await db
	// 	.select({
	// 		id: regionTable.id,
	// 		title: regionTable.title,
	// 		workspaceId: regionTable.workspaceId,
	// 		description: regionTable.description,
	// 		author: regionTable.author
	// 	})
	// 	.from(regionTable)
	// 	.leftJoin(workspaceTable, eq(workspaceTable.id, regionTable.workspaceId))
	// 	.where(eq(regionTable.author, event.locals.user.id));

	const regionList = await db
		.select({
			id: regionTable.id,
			title: regionTable.title,
			workspaceId: regionTable.workspaceId,
			description: regionTable.description,
			author: regionTable.author
		})
		.from(workspaceUserTable)
		.leftJoin(workspaceTable, eq(workspaceTable.id, workspaceUserTable.workspaceId))
		.leftJoin(regionTable, eq(regionTable.workspaceId, workspaceTable.id))
		.where(eq(workspaceUserTable.userId, event.locals.user.id));

	const companyList = await db
		.select({
			id: companyTable.id,
			title: companyTable.title,
			description: companyTable.description,
			workspaceId: companyTable.workspaceId,
			company: companyTable.company,
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
