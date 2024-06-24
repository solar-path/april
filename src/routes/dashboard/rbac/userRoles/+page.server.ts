import { db } from '$lib/database/db';
import {
	permissionTable,
	rolePermissionTable,
	roleTable,
	userRoleTable
} from '$lib/database/schema/rbac';
import { userTable } from '$lib/database/schema/users';
import type { Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	return {
		permissionList: await db.select().from(permissionTable),
		roleList: await db.select().from(roleTable),
		userList: await db.select().from(userTable),
		userRoleList: await db.select().from(userRoleTable),
		rolePermissionList: await db.select().from(rolePermissionTable)
	};
};

export const actions: Actions = {
	// ROLES
	createUserRole: async (event) => {
		const form = await superValidate(await event.request.formData(), zod());
		if (!form.valid) {
			console.log('createUserRole :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	},
	updateUserRole: async (event) => {
		const form = await superValidate(await event.request.formData(), zod());
		if (!form.valid) {
			console.log('updateUserRole :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	},
	deleteUserRole: async (event) => {
		const form = await superValidate(await event.request.formData(), zod());
		if (!form.valid) {
			console.log('deleteUserRole :: form error => ', form);
			return fail(400, { form });
		}
		return { form };
	}
};
