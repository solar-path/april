import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/database/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		uri: process.env.DATABASE_URL
	}
} satisfies Config;
