import { db } from '$lib/database/db';
import { workspaceTable } from '$lib/database/schema/entity';
import type { PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return {
			email: event.locals.user.email,
			workspaceList: await db
				.select()
				.from(workspaceTable)
				.where(eq(workspaceTable.author, event.locals.user.id))
		};
	}
};
