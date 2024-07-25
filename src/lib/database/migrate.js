import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { client, db } from './db';

export const migrateDB = async () => {
	console.log('start migration');
	try {
		await migrate(db, { migrationsFolder: './src/lib/database/migrations' });
	} catch (error) {
		console.log('migration failed', error);
	}
	await client.end();
	console.log('migration complete');
};

migrateDB();
