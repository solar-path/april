import { db } from '$lib/database/db';
import { workspaceTable } from '$lib/database/schema/entity';
import { eq } from 'drizzle-orm/mysql-core/expressions';

export const slugify = async (base: string): Promise<string> => {
	const slug = base
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '');
	let uniqueSlug = slug;
	let count = 1;

	let existing;
	do {
		existing = await db
			.select()
			.from(workspaceTable)
			.where(eq(workspaceTable.slug, uniqueSlug))
			.limit(1);

		if (existing.length === 0) {
			break;
		}

		uniqueSlug = `${slug}-${count}`;
		count++;
	} while (existing.length !== 0);

	return uniqueSlug;
};
