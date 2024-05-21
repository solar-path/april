// import { drizzle } from "drizzle-orm/mysql2";
// import { migrate } from "drizzle-orm/mysql2/migrator";
// import mysql from 'mysql2/promise';

// const connection = await mysql.createConnection({
//     host: import.meta.env.VITE_DATABASE_HOST,
//     user: import.meta.env.VITE_DATABASE_USERNAME,
//     password: import.meta.env.VITE_DATABASE_PASSWORD,
//     database: import.meta.env.VITE_DATABASE_NAME
// })

// const db = drizzle(connection)

// try {
// 	console.log('start migration');
// 	await migrate(db, { migrationsFolder: './src/lib/database/migrations' });
// 	console.log('migration complete');
// } catch (error) {
// 	console.log('migration failed', error);
// }

// await connection.end();

import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { client, db } from './db';

export const migrateDB = async () => {
	console.log('start migration');
	await migrate(db, { migrationsFolder: './src/lib/database/migrations' });
	await client.end();
	console.log('migration complete');
};

migrateDB();
