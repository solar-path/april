import { fail, superValidate } from 'sveltekit-superforms';
import { bioSchema } from './bio.schema';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';
import { userTable } from '$lib/database/schema/users';
import { eq } from 'drizzle-orm';
import { db } from '$lib/database/db';

export const load = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/login');
	}

	const user = await db
		.select({
			id: userTable.id,
			name: userTable.name,
			surname: userTable.surname,
			email: userTable.email,
			avatar: userTable.avatar,
			gender: userTable.gender,
			dob: userTable.dob,
			country: userTable.country,
			city: userTable.city,
			state: userTable.state,
			zipcode: userTable.zipcode,
			addressLine: userTable.addressLine,
			phone: userTable.phone
		})
		.from(userTable)
		.where(eq(userTable.id, event.locals.user.id))
		.limit(1);

	return { user: user[0], bioForm: await superValidate(zod(bioSchema)) };
};

export const actions = {
	updateBio: async ({ request }) => {
		const form = await superValidate(await request.formData(), zod(bioSchema));
		console.log('profile/+page.server.ts :: form => ', form);

		if (!form.valid) {
			console.log('profile/+page.server.ts :: form error => ', form);
			return fail(400, { form });
		}

		return { form };
	}
};
