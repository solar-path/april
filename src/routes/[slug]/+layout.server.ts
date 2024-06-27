import { error, redirect } from '@sveltejs/kit';
import { getWorkspaceList } from '$lib/helpers/getWorkspace';

export const load = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/login');
	}

	const workspaceList = await getWorkspaceList(event.locals.user.id);
	if (!workspaceList.some((workspace) => workspace.slug === event.params.slug)) {
		throw error(404, 'Page not found');
	}

	return {
		workspaceList
	};
};
