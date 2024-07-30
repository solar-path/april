import { contactUsSchema, findInquiryByIDSchema } from '$lib/forms/contact/contact.schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { getWorkspaceBySlug, getWorkspaceList } from '$lib/helpers/getWorkspace';
import { workspaceSchema } from '$lib/components/Workspace/workspace.schema';
import { companyTable } from '$lib/database/schema/entity.js';
import { eq } from 'drizzle-orm';
import { db } from '$lib/database/db';

export const load = async (event) => {
	const currentUser = event.locals.user;

	const workspaceList = currentUser ? await getWorkspaceList(currentUser.id) : [];
	const currentWorkspace = await getWorkspaceBySlug(event.params.workspace);

	const companyList =
		currentUser && workspaceList.length > 0 && currentWorkspace
			? await db
					.select()
					.from(companyTable)
					.where(eq(companyTable.workspaceId, currentWorkspace.id))
			: [];

	return {
		currentUser: currentUser ? currentUser : null,
		contactUsForm: await superValidate(zod(contactUsSchema)),
		trackInquiryForm: await superValidate(zod(findInquiryByIDSchema)),
		workspaceList,
		companyList,
		workspaceForm: await superValidate(zod(workspaceSchema))
	};
};
