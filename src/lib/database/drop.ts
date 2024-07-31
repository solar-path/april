import { sql } from 'drizzle-orm';
import { client, db } from './db';

async function main() {
	console.log('Dropping all tables in schema started');
	try {
		const dropTablesQuery = sql`
            do $$
            declare
                r record;
            begin
                for r in (select tablename from pg_tables where schemaname = 'public' and tablename not in ('industry', 'country')) loop
                    execute 'drop table if exists ' || quote_ident(r.tablename) || ' cascade';
                end loop;
            end $$
        `;
		await db.execute(dropTablesQuery);

		await client.end();
	} catch (error) {
		console.log('Dropping tables failed => ', error);
	}
	console.log('Dropping all tables in schema finished');
}

main();
