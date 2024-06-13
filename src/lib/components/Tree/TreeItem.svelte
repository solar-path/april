<script lang="ts">
	import { SidebarDropdownWrapper, SidebarItem } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { selectedItem } from '$lib/components/Tree/TreeView.utilities';
	import TreeItem from './TreeItem.svelte'; // Correct import statement for TreeItem

	export let item: any;
	export let option: 'select' | 'route';
	export let route: string = '';
	export let form: any;

	const dispatch = createEventDispatcher();

	const selectParent = (item: any) => {
		form.parent = item.title;
		form.parentId = item.id;
		form.code = item.code;
		selectedItem.set(item);
		dispatch('itemSelected', item);
	};
</script>

{#if option === 'route' && route !== ''}
	{#if item.children && item.children.length > 0}
		<a href={`${route}/${item.id}`}>
			<SidebarDropdownWrapper label={item.title}>
				{#each item.children as child}
					<div class="ml-2">
						<TreeItem item={child} {option} {route} {form} />
					</div>
				{/each}
			</SidebarDropdownWrapper>
		</a>
	{:else}
		<SidebarItem label={item.title} href={`${route}/${item.id}`} />
	{/if}
{/if}

{#if option === 'select'}
	{#if item.children && item.children.length > 0}
		<button on:click={() => selectParent(item)} class="w-full">
			<SidebarDropdownWrapper label={item.title}>
				{#each item.children as child}
					<div class="ml-2">
						<TreeItem item={child} {option} {route} {form} />
					</div>
				{/each}
			</SidebarDropdownWrapper>
		</button>
	{:else}
		<SidebarItem label={item.title} on:click={() => selectParent(item)} />
	{/if}
{/if}
