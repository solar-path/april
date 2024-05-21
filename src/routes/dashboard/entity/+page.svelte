<script lang="ts">
	import StructureTree from '$lib/Entity/Tables/StructureTree.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;
	// $: console.log('/dashboard/structure :: data => ', data);
</script>

<StructureTree {data} />
