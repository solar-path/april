import { derived, writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const sortKey = writable('id'); // default sort key
export const sortDirection = writable(1); // default sort direction (ascending)
export const sortItems: Writable<any[]> = writable([]);

export const currentPage = writable(1);
export const itemsPerPage = 10;

export const totalPages = derived(sortItems, ($sortItems) =>
	Math.ceil($sortItems.length / itemsPerPage)
);

export const sortTable = (key: string) => {
	sortKey.update((currentKey) => {
		if (currentKey === key) {
			sortDirection.update((val) => -val);
			return currentKey; // Return the currentKey to leave sortKey unchanged in this case
		} else {
			sortDirection.set(1);
			return key; // Update sortKey with the new key
		}
	});
};

export const filterAndSearch = (items: any[], searchTerm: string) => {
	return items.filter((item) => {
		return Object.values(item).some(
			(value) => value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
		);
	});
};

export const sortData = (data: any[], direction: number) => {
	const key = get(sortKey); // Use get to access the value of sortKey
	const sorted = [...data].sort((a, b) => {
		const aVal = a[key];
		const bVal = b[key];
		if (aVal < bVal) {
			return -direction;
		} else if (aVal > bVal) {
			return direction;
		}
		return 0;
	});
	sortItems.set(sorted);
};
