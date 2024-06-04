import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/database/db';
// import { buildTree } from '$lib/components/Tree/TreeView.utilities';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';
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

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/login');
	}

	const workspaceList = await db.select().from(workspaceTable);
	const regionList = await db.select().from(regionTable);
	const companyList = await db.select().from(companyTable);
	const departmentList = await db.select().from(departmentTable);
	const positionList = await db.select().from(positionTable);

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
									const departmentPositions = positionList.filter(
										(position) => position.departmentId === department.id
									);
									return departmentPositions.length > 0
										? { ...department, positions: departmentPositions }
										: null;
								})
								.filter(Boolean);
							return companyDepartments.length > 0
								? { ...company, departments: companyDepartments }
								: null;
						})
						.filter(Boolean);
					return regionCompanies.length > 0 ? { ...region, companies: regionCompanies } : null;
				})
				.filter(Boolean);
			return workspaceRegions.length > 0 ? { ...workspace, regions: workspaceRegions } : null;
		})
		.filter(Boolean);

	return {
		tree,
		workspaceForm: await superValidate(zod(workspaceSchema)),
		regionForm: await superValidate(zod(regionSchema)),
		companyForm: await superValidate(zod(companySchema)),
		departmentForm: await superValidate(zod(departmentSchema)),
		positionForm: await superValidate(zod(positionSchema))
	};
};

// export const actions: Actions = {
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
// };
