import { db } from '$lib/database/db';
import { workspaceTable } from '$lib/database/schema/entity';
import { contactUsSchema, findInquiryByIDSchema } from '$lib/forms/contact/contact.schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const currentUser = event.locals.user;
	return {
		currentUser: currentUser ? currentUser : null,
		contactUsForm: await superValidate(zod(contactUsSchema)),
		trackInquiryForm: await superValidate(zod(findInquiryByIDSchema)),
		workspaceList: currentUser
			? await db.select().from(workspaceTable).where(eq(workspaceTable.author, currentUser.id))
			: []
	};
};
