import { db } from '$lib/database/db';
import { eq } from 'drizzle-orm/mysql-core/expressions';
import { Table, Column } from 'drizzle-orm'; // Adjust import based on actual types

/**
 * @description create a slug from a string
 * @param {string} base - The string to slugify
 * @param {Table} database - The database to check for uniqueness
 * @param {Column} field - The field to check for uniqueness
 * @returns The slugified string
 */
export const slugify = async (base: string, database: Table, field: Column): Promise<string> => {
	const slug = base
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '');
	let uniqueSlug = slug;
	let count = 1;

	let existing;
	do {
		existing = await db.select().from(database).where(eq(field, uniqueSlug)).limit(1);

		if (existing.length === 0) {
			break;
		}

		uniqueSlug = `${slug}-${count}`;
		count++;
	} while (existing.length !== 0);

	return uniqueSlug;
};
