import { writable } from 'svelte/store';

interface SelectWithSearchItem {
	[key: string]: any;
}

export const selectedWithSearchItem = writable<SelectWithSearchItem>();
