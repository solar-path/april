<script lang="ts">
	import { Button, Li, List } from 'flowbite-svelte';
	import { ChevronRightOutline, ChevronDownOutline, MinusOutline } from 'flowbite-svelte-icons';
	import { selectedItem, treeState } from '$lib/components/Tree/TreeView.utilities';
	import { createEventDispatcher } from 'svelte';

	export let tree: any;
	export let option: 'select' | 'route' = 'route';
	export let showSelectButton: true | false = false;
	export let form: any;
	// export let modalState: boolean = false;
	const dispatch = createEventDispatcher();

	let expandedItems: Record<string, boolean> = {};

	$: {
		if (tree && Array.isArray(tree)) {
			if ($treeState === 'expanded') {
				expandAll(tree);
			} else if ($treeState === 'collapsed') {
				collapseAll(tree);
			}
		}
	}

	const toggleExpand = (id: any) => {
		expandedItems[id] = !expandedItems[id];
	};

	const expandAll = (nodes: any) => {
		nodes.forEach((node: any) => {
			expandedItems[node.id] = true;
			if (node.children && node.children.length) {
				expandAll(node.children);
			}
		});
	};

	const collapseAll = (nodes: any) => {
		nodes.forEach((node: any) => {
			expandedItems[node.id] = false;
			if (node.children && node.children.length) {
				collapseAll(node.children);
			}
		});
	};

	const selectParent = (item: any) => {
		form.parent = item.title;
		form.parentId = item.id;
		form.code = item.code;
		selectedItem.set(item);
		// modalState = false;
		dispatch('itemSelected', item);
	};
</script>

<List tag="ul" class="space-y-1 text-gray-500" list="none">
	{#each tree as item}
		<Li class="group flex flex-row items-center">
			{#if item.children && item.children.length > 0}
				{#if expandedItems[item.id]}
					<ChevronDownOutline on:click={() => toggleExpand(item.id)} class="cursor-pointer" />
				{:else}
					<ChevronRightOutline on:click={() => toggleExpand(item.id)} class="cursor-pointer" />
				{/if}
			{:else}
				<MinusOutline class="cursor-pointer" />
			{/if}

			{#if option === 'route'}
				<a
					href="/learn/{item.id}"
					on:click={() => toggleExpand(item.id)}
					class="ml-2 cursor-pointer"
				>
					{item.title}</a
				>
			{:else}
				<button
					type="button"
					on:click={() => {
						toggleExpand(item.id);
						selectedItem.set(item);
					}}
					class="ml-2 cursor-pointer"
				>
					{item.title}
				</button>
			{/if}

			{#if showSelectButton === true}
				<div class="ml-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100">
					<Button type="button" color="alternative" size="xs" on:click={() => selectParent(item)}
						>Select</Button
					>
				</div>
			{/if}
		</Li>

		{#if item.children && expandedItems[item.id]}
			<List tag="ul" class="ml-4 space-y-1 text-gray-500" list="none">
				<Li><svelte:self tree={item.children} {option} {showSelectButton} {form} /></Li>
			</List>
		{/if}
	{/each}
</List>
