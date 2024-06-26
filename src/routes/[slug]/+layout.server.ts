import { getWorkspaceList } from '$lib/helpers/getWorkspace.js';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	console.log('/[slug]/layout :: workspace => ', event.params.slug);
	if (!event.locals.user) {
		redirect(302, '/login');
	}
	return {
		currentWorkspace: event.params.slug,
		workspaceList: await getWorkspaceList(event.locals.user.id)
	};
};
