<script lang="ts">
	import TreeView from '$lib/components/Tree/TreeView.svelte';
	import { Input } from 'flowbite-svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const tree = data.postTree;
	// console.log('/public/learn/layout.svelte :: data.postTree => ', data.postTree);
</script>

<div class="flex flex-row space-x-4">
	<div class="w-1/4">
		<h2
			class="ml-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			Learn & Support
		</h2>
		<Input type="text" placeholder="Search..." class="w-full" />
		<div class="m-4">
			<TreeView {tree} option="route" showSelectButton={false} />
		</div>
	</div>
	<div class="ml-2 w-3/4"><slot /></div>
</div>
