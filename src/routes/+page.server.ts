import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user)
		return {
			email: event.locals.user.email
		};
};
