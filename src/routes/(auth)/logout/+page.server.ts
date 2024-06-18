import { lucia } from '$lib/auth/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	logout: async (event) => {
		// Check if user is logged in
		if (!event.locals.session) {
			return fail(401);
		}

		// Invalidate session
		await lucia.invalidateSession(event.locals.session.id);

		// Create blank session cookie
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/');
	}
};
