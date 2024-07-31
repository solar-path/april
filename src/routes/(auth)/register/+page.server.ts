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
import { roleTable, userRoleTable } from '$lib/database/schema/rbac';

/**
 * @author Ali
 * @description - Load the register page
 * @returns {Promise<{registerForm: SuperForm<typeof registerSchema>}>}
 */
export const load = async () => {
	return {
		registerForm: await superValidate(zod(registerSchema))
	};
};

/**
 * @author Ali
 * @description - Handle the register form
 * 1. Validate the form
 * 2. Check if the user already exists
 * 		true - return error
 * 		false - continue
 * 3. Create a new user
 * 4. Create a new workspace
 * 5. Associate the user to the workspace
 * 6. Assign workspace admin role
 * 7. Send a verification email
 * 8. Redirect to the login page
 * @param {Request} event - The request event
 * @returns {Promise<{form: SuperForm<typeof registerSchema>}>}
 */

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
				name: form.data.name.trim(),
				surname: form.data.surname.trim()
			})
			.returning({ id: userTable.id });

		if (newUser[0].id) {
			await sendVerificationEmail(form.data.email.trim().toLowerCase(), token);

			// Create a new workspace on user registration
			const newWorkspace = await db
				.insert(workspaceTable)
				.values({
					id: crypto.randomUUID(),
					title: form.data.workspace.trim(),
					workspace: await slugify(
						form.data.workspace.trim(),
						workspaceTable,
						workspaceTable.workspace
					),
					author: newUser[0].id
				})
				.returning({ id: workspaceTable.id });

			// Associate the user to the workspace
			await db.insert(workspaceUserTable).values({
				id: crypto.randomUUID(),
				userId: newUser[0].id,
				workspaceId: newWorkspace[0].id
			});

			// get the workspace admin role
			const workspaceAdminRole = await db
				.select({ id: roleTable.id })
				.from(roleTable)
				.where(eq(roleTable.role, 'workspace_admin'))
				.limit(1);

			// Assign workspace admin role
			await db.insert(userRoleTable).values({
				id: crypto.randomUUID(),
				userId: newUser[0].id,
				workspaceId: newWorkspace[0].id,
				roleId: workspaceAdminRole[0].id
			});

			return redirect(302, '/login');
		}

		return { form };
	}
};
