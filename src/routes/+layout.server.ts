import { contactUsSchema, findInquiryByIDSchema } from '$lib/forms/contact/contact.schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { getWorkspaceList } from '$lib/helpers/getWorkspace';

export const load = async (event) => {
	const currentUser = event.locals.user;
	return {
		currentUser: currentUser ? currentUser : null,
		contactUsForm: await superValidate(zod(contactUsSchema)),
		trackInquiryForm: await superValidate(zod(findInquiryByIDSchema)),
		workspaceList: currentUser ? await getWorkspaceList(currentUser.id) : []
	};
};
