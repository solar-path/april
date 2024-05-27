import { db } from '$lib/database/db';
import { matrixTable } from '$lib/database/schema/rcm';
import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteMatrixSchema, matrixSchema } from './matrix.schema';

export const load: PageServerLoad = async () => {
	return {
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
