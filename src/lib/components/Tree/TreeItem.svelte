<script lang="ts">
	import { SidebarDropdownWrapper, SidebarItem } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { selectedItem } from '$lib/components/Tree/TreeView.utilities';
	import TreeItem from './TreeItem.svelte'; // Correct import statement for TreeItem
	import { formStore } from '../form/formStore';

	export let item: any;
	export let option: 'select' | 'route';
	export let route: string = '';
	export let form: any;
	export let fieldId: string = '';
	export let fieldName: string = '';

	const dispatch = createEventDispatcher();

	const selectItem = (item: any) => {
		// use this to pick items for displaying item in forms
		formStore.update((store) => {
			store[fieldId] = { fieldId: item.id, fieldName: item.title };
			return store;
		});
		// use this to pick items for displaying item in cards.
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
		<SidebarDropdownWrapper>
			<svelte:fragment slot="icon">
				<button on:click={() => selectItem(item)} class="w-full text-left">{item.title}</button>
			</svelte:fragment>
			{#each item.children as child}
				<div class="ml-2">
					<TreeItem item={child} option="select" route="" {form} {fieldId} {fieldName} />
				</div>
			{/each}
		</SidebarDropdownWrapper>
	{:else}
		<SidebarItem label={item.title} on:click={() => selectItem(item)} />
	{/if}
{/if}
