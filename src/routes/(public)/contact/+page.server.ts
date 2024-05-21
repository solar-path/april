import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { contactUsSchema, findInquiryByIDSchema } from '../../../lib/forms/contact/contact.schema';
import { sendInquiryAcceptanceEmail } from '$lib/email/mail.server';
import { db } from '$lib/database/db';
import { inquiryTable } from '$lib/database/schema/inquiries';
import { eq } from 'drizzle-orm/mysql-core/expressions';

export const actions: Actions = {
	submitInquiry: async ({ request }) => {
		const form = await superValidate(await request.formData(), zod(contactUsSchema));
		// console.log('/contactUs/+page.server.ts :: form => ', form);

		if (!form.valid) {
			return fail(400, { form });
		}

		const id = crypto.randomUUID();
		const newInquiry = await db.insert(inquiryTable).values({
			id: id,
			email: form.data.email,
			message: form.data.message
		});

		await sendInquiryAcceptanceEmail(form.data.email, id, form.data.message);

		return { form };
	},
	findInquiryByID: async ({ request }) => {
		const form = await superValidate(await request.formData(), zod(findInquiryByIDSchema));
		// console.log('contactUS :: +page.server.ts :: form.data => ', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		const inquiryItem = await db
			.select()
			.from(inquiryTable)
			.where(eq(inquiryTable.id, form.data.id));
		// console.log('contactUS :: +page.server.ts :: inquiryItem => ', inquiryItem);
		if (inquiryItem[0]) {
			return { form, inquiry: inquiryItem[0] };
		} else {
			return setError(form, 'id', 'Inquiry was not found');
		}
	}
};
