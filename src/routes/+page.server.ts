import { getWorkspaceListByAssociatedUser } from '$lib/helpers/getWorkspace';

export const load = async (event) => {
	if (event.locals.user) {
		return {
			workspaceList: await getWorkspaceListByAssociatedUser(event.locals.user.id)
		};
	}
};
