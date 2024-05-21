// import mysql from 'mysql2/promise';
// import { drizzle } from 'drizzle-orm/mysql2';

import { sql } from 'drizzle-orm';
import { client, db } from './db';

// async function main() {
//     const connection = await mysql.createConnection({
//         host: import.meta.env.VITE_DATABASE_HOST,
//         user: import.meta.env.VITE_DATABASE_USERNAME,
//         password: import.meta.env.VITE_DATABASE_PASSWORD,
//         database: import.meta.env.VITE_DATABASE_NAME
//     });

//     const db = drizzle(connection);

//     console.log('Dropping database started');
//     try {
//         await connection.execute('DROP DATABASE april');
//         await connection.execute('CREATE DATABASE april');
//     } catch (error) {
//         console.log('Dropping database failed => ', error);
//     } finally {
//         // Ensure the connection is closed before exiting the script
//         await connection.end();
//     }
//     console.log('Dropping database finished');
// }

// main();

async function main() {
	console.log('Dropping database started');
	try {
		await db.execute(sql`DROP DATABASE IF EXISTS postgres`);
		await db.execute(sql`CREATE DATABASE IF NOT EXISTS postgres`);
		await client.end();
	} catch (error) {
		console.log('Dropping database failed => ', error);
	}
	console.log('Dropping database finished');
}

main();
