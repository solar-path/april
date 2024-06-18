import { db } from '$lib/database/db.js';
import { userTable } from '$lib/database/schema/users';
import { sendWelcomeEmail } from '$lib/email/mail.server';
import { eq } from 'drizzle-orm/mysql-core/expressions';

export const load = async ({ params }) => {
	let heading = 'Account Verification Problem';
	let message =
		'Your email could not be verified. Please contact support if you feel this is an error.';

	try {
		// const token =  as string;
		// console.log('verify-account-[token]/+page.server.ts :: token => ', token);

		const account = await db.select().from(userTable).where(eq(userTable.token, params.token));
		if (!account[0]) {
			return { heading: heading, message: message };
		}

		if (account[0]) {
			sendWelcomeEmail(account[0].email);
			await db.update(userTable).set({ activated: true }).where(eq(userTable.token, params.token));
			heading = 'Account Verified';
			message = `I am pleased to inform you that your account has been successfully verified. 
                This means that all necessary steps have been completed to confirm the authenticity and accuracy of the information provided.`;
			return { heading: heading, message: message };
		}
	} catch (error) {
		return { heading: heading, message: error };
	}
};
