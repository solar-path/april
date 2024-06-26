import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	console.log('/[slug]/layout :: workspace => ', event.params.slug);
	if (!event.locals.user) {
		redirect(302, '/login');
	}
};
