import { getWorkspaceList } from '$lib/helpers/getWorkspace';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return {
			workspaceList: await getWorkspaceList(event.locals.user.id)
		};
	}
};
