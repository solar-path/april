import { writable } from 'svelte/store';

export interface Item {
	id: string;
	parentId?: string;
	children: Item[];
	[key: string]: unknown; // For any other properties that might exist
}

/*
 * use at server
 * Builds a tree from a list of items.
 * Each item should have an id, parentId, and children property.
 * @param dataList - The list of items to build the tree from.
 * @returns The tree of items.
 */
export const buildTree = (dataList: Item[]) => {
	const dataMap: { [postId: string]: Item } = {};
	const dataTree: Item[] = [];

	// Create a map for faster lookup
	dataList.forEach((item: Item) => {
		item.children = [];
		dataMap[item.id] = item as Item;
	});

	dataList.forEach((item: Item) => {
		if (item.parentId && dataMap[item.parentId]) {
			dataMap[item.parentId].children.push(item as Item);
		} else {
			dataTree.push(item as Item);
		}
	});

	return dataTree;
};

/*
 * use at client
 * @returns selected in tree item (by click).
 */
export const selectedItem = writable<Item | null>(null);

/*
 * use at client
 * @returns The tree of items.
 */
export const treeState = writable('collapsed');
