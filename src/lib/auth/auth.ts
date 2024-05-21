import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '$lib/database/db';
import { sessionTable } from '$lib/database/schema/session';
import { userTable } from '$lib/database/schema/users';

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes(attributes) {
		return {
			// attributes has the type of DatabaseUserAttributes
			email: attributes.email
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
	fullname: string;
	avatar: string;
}
