// import { drizzle } from 'drizzle-orm/mysql2';
// import mysql from 'mysql2/promise';
// import {
// 	DATABASE_HOST,
// 	DATABASE_USERNAME,
// 	DATABASE_PASSWORD,
// 	DATABASE_NAME
// } from '$env/static/private';

// const connection = await mysql.createConnection({
// 	host: DATABASE_HOST,
// 	user: DATABASE_USERNAME,
// 	database: DATABASE_NAME,
// 	password: DATABASE_PASSWORD
// });

// export const db = drizzle(connection);

// import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const client =
	postgres(`postgres://postgres.cbrulsotrgkqeabgxbrl:oMU5wYe45BWhlqEB@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
`);
// export const client = postgres(DATABASE_URL);
export const db = drizzle(client);
