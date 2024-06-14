<script lang="ts">
	import { P, Sidebar, SidebarGroup, SidebarWrapper } from 'flowbite-svelte';
	import TreeItem from './TreeItem.svelte';
	import { page } from '$app/stores';

	export let tree: any;
	export let option: 'select' | 'route' = 'route';
	export let route: string = '';
	export let form: any;
	export let fieldId: string = '';
	export let fieldName: string = '';
	$: activeUrl = $page.url.pathname;
</script>

<Sidebar class="w-full" {activeUrl}>
	<SidebarWrapper class="bg-white">
		<SidebarGroup>
			{#if tree.length > 0}
				{#each tree as item}
					<TreeItem {item} {option} {route} {form} {fieldId} {fieldName} />
				{/each}
			{:else}
				<P class="text-center text-gray-500">No data found. Please create items first</P>
			{/if}
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
