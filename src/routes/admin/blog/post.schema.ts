import { db } from '$lib/database/db';
import { blogTable } from '$lib/database/schema/blog';
import { z } from 'zod';

const posts = await db
	.select({
		id: blogTable.id,
		title: blogTable.title
	})
	.from(blogTable);

export const postSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, { message: 'Field cannot be blank' }),
	content: z.string().min(1, { message: 'Field cannot be blank' }),
	coverImage: z.string().optional(),
	parentId: z.string().optional(),
	parent: z
		.string()
		.optional()
		.refine(
			(value) => {
				const validItems = posts.map((post) => post.title.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{
				message: 'Parent post not found'
			}
		),
	status: z.string(),
	readingFor: z.string()
});

export const postDeleteSchema = z.object({
	id: z.string()
});
