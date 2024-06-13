<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarWrapper } from 'flowbite-svelte';
	import TreeItem from './TreeItem.svelte';
	import { page } from '$app/stores';

	export let tree: any;
	export let option: 'select' | 'route' = 'route';
	export let route: string = '';
	export let form: any;
	$: activeUrl = $page.url.pathname;
</script>

<Sidebar class="w-full" {activeUrl}>
	<SidebarWrapper class="bg-white">
		<SidebarGroup>
			{#each tree as item}
				<TreeItem {item} {option} {route} {form} />
			{/each}
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
