import { db } from '$lib/database/db';
import { riskTable } from '$lib/database/schema/rcm';
import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';

import { riskDeleteSchema, riskSchema } from './risk.schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	return {
		// RISK
		riskList: await db.select().from(riskTable),
		riskForm: await superValidate(zod(riskSchema))
	};
};

export const actions: Actions = {
	createRisk: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(riskSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		await db
			.insert(riskTable)
			.values({
				id: crypto.randomUUID(),
				title: form.data.title,
				author: event.locals.user?.id || 'unknown'
			})
			.returning();

		return { form };
	},
	updateRisk: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(riskSchema));
		if (!form.valid || form.data.id === undefined) {
			return fail(400, { form });
		}
		const risk = await db.select().from(riskTable).where(eq(riskTable.id, form.data.id));
		if (risk.length === 0) {
			return fail(400, { form });
		}
		await db
			.update(riskTable)
			.set({
				title: form.data.title,
				author: event.locals.user?.id
			})
			.where(eq(riskTable.id, form.data.id));

		return { form };
	},
	deleteRisk: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(riskDeleteSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		await db.delete(riskTable).where(eq(riskTable.id, form.data.id));
		return { form };
	}
};
