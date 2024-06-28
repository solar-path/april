import { fail, superValidate, withFiles } from 'sveltekit-superforms';
import { profileSchema } from './profile.schema';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';
import { userTable } from '$lib/database/schema/users';
import { eq } from 'drizzle-orm';
import { db } from '$lib/database/db';
import { fileProcessor } from '$lib/helpers/fileProcessor';

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
			phone: userTable.phone,
			idNumber: userTable.idNumber
		})
		.from(userTable)
		.where(eq(userTable.id, event.locals.user.id))
		.limit(1);

	return { user: user[0], profileForm: await superValidate(zod(profileSchema)) };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(await event.request.formData(), zod(profileSchema));

		if (!form.valid) {
			console.log('profile/+page.server.ts :: form error => ', form);
			return fail(400, withFiles({ form }));
		}

		const user = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, event.locals.user!.id))
			.limit(1);

		await db
			.update(userTable)
			.set({
				name: user[0].name === form.data.name ? user[0].name : form.data.name,
				surname: user[0].surname === form.data.surname ? user[0].surname : form.data.surname,
				gender: user[0].gender === form.data.gender ? user[0].gender : form.data.gender,
				dob: user[0].dob === form.data.dob ? user[0].dob : form.data.dob,
				avatar:
					form.data.avatar instanceof File
						? await fileProcessor(form.data.avatar, 'avatar')
						: user[0].avatar,
				phone: user[0].phone === form.data.phone ? user[0].phone : form.data.phone,
				country: user[0].country === form.data.country ? user[0].country : form.data.country,
				state: user[0].state === form.data.state ? user[0].state : form.data.state,
				zipcode: user[0].zipcode === form.data.zipcode ? user[0].zipcode : form.data.zipcode,
				addressLine:
					user[0].addressLine === form.data.addressLine
						? user[0].addressLine
						: form.data.addressLine,
				city: user[0].city === form.data.city ? user[0].city : form.data.city,
				idNumber: user[0].idNumber === form.data.idNumber ? user[0].idNumber : form.data.idNumber
			})
			.where(eq(userTable.id, event.locals.user!.id));
		return withFiles({ form });
	}
};
