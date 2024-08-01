import type { Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { addressSchema, deleteAddressSchema } from './address.schema';

export const actions: Actions = {
	createContact: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(addressSchema));

		if (!form.valid) {
			console.log('/contact/+page.server.ts :: create contact form is not valid => ', form);
			return fail(400, { form });
		}

		return { form };
	},
	updateContact: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(addressSchema));

		if (!form.valid) {
			console.log('/contact/+page.server.ts :: update contact form is not valid => ', form);
			return fail(400, { form });
		}

		return { form };
	},
	deleteContact: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(deleteAddressSchema));

		if (!form.valid) {
			console.log('/contact/+page.server.ts :: delete contact form is not valid => ', form);
			return fail(400, { form });
		}

		return { form };
	}
};
