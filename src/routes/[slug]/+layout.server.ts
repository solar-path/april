import { error, redirect } from '@sveltejs/kit';
import { getWorkspaceBySlug, getWorkspaceList } from '$lib/helpers/getWorkspace';

export const load = async (event: any) => {
	if (!event.locals.user) {
		redirect(302, '/login');
	}

	const workspaceList = await getWorkspaceList(event.locals.user.id);

	if (!workspaceList.some((workspace) => workspace.slug === event.params.slug)) {
		const workspace = await getWorkspaceBySlug(event.params.slug);
		if (!workspace) {
			throw error(404, 'Page not found');
		}
		workspaceList[0] = workspace;
	}

	return {
		workspaceList
	};
};
