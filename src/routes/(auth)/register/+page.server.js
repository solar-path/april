import { registerSchema } from './register.schema';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/database/db';
import { userTable, workspaceUserTable } from '$lib/database/schema/users';
import { eq } from 'drizzle-orm/mysql-core/expressions';
import { Argon2id } from 'oslo/password';
import { sendVerificationEmail } from '$lib/email/mail.server';
import { redirect } from '@sveltejs/kit';
import { workspaceTable } from '$lib/database/schema/entity';
import { slugify } from '$lib/helpers/slugify';

export const load = async () => {
	return {
		registerForm: await superValidate(zod(registerSchema))
	};
};

export const actions = {
	default: async (event) => {
		// Get the form data
		const form = await superValidate(await event.request.formData(), zod(registerSchema));

		// Validate the form
		if (!form.valid) {
			return fail(400, { form });
		}

		// Check if the user already exists
		const existingUser = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, form.data.email.trim().toLowerCase()))
			.limit(1);

		if (existingUser.length > 0) {
			return setError(form, 'email', 'User already registered');
		}

		const token = crypto.randomUUID();

		// Create a new user
		const newUser = await db
			.insert(userTable)
			.values({
				id: crypto.randomUUID(),
				email: form.data.email.trim().toLowerCase(),
				password: await new Argon2id().hash(form.data.password),
				token: token,
				name: form.data.name.trim() as string,
				surname: form.data.surname.trim() as string
			})
			.returning({ id: userTable.id });

		if (newUser[0].id) {
			await sendVerificationEmail(form.data.email.trim().toLowerCase(), token);

			// Create a new workspace on user registration
			const newWorkspace = await db
				.insert(workspaceTable)
				.values({
					id: crypto.randomUUID(),
					title: form.data.workspace.trim() as string,
					slug: await slugify(form.data.workspace.trim() as string),
					author: newUser[0].id
				})
				.returning({ id: workspaceTable.id });

			// Associate the user to the workspace
			await db.insert(workspaceUserTable).values({
				id: crypto.randomUUID(),
				userId: newUser[0].id,
				workspaceId: newWorkspace[0].id
			});

			return redirect(302, '/login');
		}

		return { form };
	}
};
