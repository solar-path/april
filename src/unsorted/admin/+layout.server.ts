import { redirect } from '@sveltejs/kit';
import type { LayoutServerData } from './$types';

export const load: LayoutServerData = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/');
	}
};
