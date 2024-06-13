<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarWrapper } from 'flowbite-svelte';
	import TreeItem from './TreeItem.svelte';

	export let tree: any;
	export let option: 'select' | 'route' = 'route';
	export let route: string = '';
	export let form: any;
</script>

<Sidebar class="w-full">
	<SidebarWrapper class="bg-white">
		<SidebarGroup>
			{#each tree as item}
				<TreeItem {item} {option} {route} {form} />
			{/each}
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
