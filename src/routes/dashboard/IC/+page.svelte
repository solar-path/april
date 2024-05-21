<script lang="ts">
	import { Tabs, TabItem } from 'flowbite-svelte';
	import {
		ExclamationCircleOutline,
		TableColumnOutline,
		ShieldOutline,
		ShuffleOutline
	} from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import MatrixTable from '$lib/IC/tables/matrixTable.svelte';
	import ProcessTree from '$lib/IC/tables/processTree.svelte';
	import RiskTable from '$lib/IC/tables/riskTable.svelte';
	import ControlTable from '$lib/IC/tables/controlTable.svelte';

	export let data: PageData;

	// console.log('/dashboard/IC/+page.svelte => ', data);
</script>

<Tabs tabStyle="underline">
	<TabItem open>
		<div slot="title" class="flex items-center gap-2">
			<TableColumnOutline size="md" />
			Matrix
		</div>
		<MatrixTable {data} />
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<ShuffleOutline size="md" />
			Process
		</div>
		<ProcessTree {data} />
	</TabItem>

	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<ExclamationCircleOutline size="md" />
			Risk
		</div>
		<RiskTable {data} />
	</TabItem>

	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<ShieldOutline size="md" />
			Control
		</div>
		<ControlTable {data} />
	</TabItem>
</Tabs>
