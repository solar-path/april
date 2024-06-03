// import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const client =
	postgres(`postgres://postgres.cplsjvtzjqsledogzouh:vL26qn8MwP5Q1rck@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
`);
// export const client = postgres(DATABASE_URL);
export const db = drizzle(client);
