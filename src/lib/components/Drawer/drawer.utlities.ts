import { writable } from 'svelte/store';

export let hideDrawer = writable<boolean>(true);
export let drawerContent = writable<{
	title: string;
	content: any;
	props: any;
	item?: null;
} | null>(null);

export const fillDrawer = (title: string, content: any, data: any, item?: any) => {
	drawerContent.set({ title, content, props: { data, item } });
	// hideDrawer.update((value) => !value);
	hideDrawer.set(false);
};
