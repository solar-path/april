<script lang="ts">
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import TreeView from '$lib/components/Tree/TreeView.svelte';
	import { Button, Dropdown, DropdownItem, Tooltip } from 'flowbite-svelte';
	import {
		ChevronDownOutline,
		EditOutline,
		FileChartBarOutline,
		FilePdfOutline,
		PlusOutline
	} from 'flowbite-svelte-icons';
	import Process from '../processes/Process.form.svelte';
	import { selectedItem, treeState } from '$lib/components/Tree/TreeView.utilities';
	import { generatePdfProcessReport } from '../processes/ProcessReport.pdf';
	import { generateXlsProcessReport } from '../processes/ProcessReport.xls';
	import DeleteButton from '$lib/components/DeleteButton.svelte';

	interface ProcessData {
		id: number;
		title: string;
		description: string;
	}

	export let data: any;
	$: processList = data.processList as ProcessData[];
</script>

<div class="mb-2 flex flex-row justify-end space-x-2">
	<Button
		on:click={() => {
			fillDrawer('New process', Process, data);
		}}><PlusOutline /></Button
	>
	<Button color="alternative">Actions<ChevronDownOutline /></Button>

	<Dropdown class="w-44 divide-y divide-gray-100">
		<DropdownItem>Mass Edit</DropdownItem>
		<DropdownItem>Delete all</DropdownItem>
	</Dropdown>

	<Button color="alternative" type="button" on:click={() => generatePdfProcessReport(processList)}
		><FilePdfOutline /><Tooltip>Export as PDF</Tooltip></Button
	>
	<Button color="alternative" type="button" on:click={() => generateXlsProcessReport(processList)}
		><FileChartBarOutline /><Tooltip>Export as XLS</Tooltip></Button
	>
</div>
<div class="mt-2 flex w-full flex-col">
	<div class="flex w-full">
		<caption class="text-left text-2xl font-semibold text-gray-900">
			Business process
			<p class="mb-4 mt-1 text-sm font-normal text-gray-500">
				Browse a list of company's business processes.
			</p>
		</caption>
	</div>
	<div class="flex flex-row">
		<div class="w-1/3">
			<div class="flex flex-col">
				<div class="flex justify-end">
					<button
						type="button"
						class="text-sm text-red-700 hover:text-red-800"
						on:click={() => ($treeState = $treeState === 'expanded' ? 'collapsed' : 'expanded')}
					>
						{$treeState === 'expanded' ? 'Collapse' : 'Expand'}
					</button>
				</div>
				<div class="w-full">
					<TreeView form={null} showSelectButton={false} tree={data.processTree} option="select" />
				</div>
			</div>
		</div>
		<div class="ml-8 w-2/3">
			{#if $selectedItem}
				<ul class="space-y-2">
					<li>
						<div class="flex flex-row">
							<div>
								<p class="font-medium">Process</p>
								<p class="text-sm font-normal text-gray-500">{$selectedItem?.title}</p>
							</div>
							<div class="ml-auto flex flex-row justify-end space-x-2">
								<Button
									outline={true}
									class="h-9 w-10 !p-2"
									size="xs"
									on:click={() =>
										fillDrawer('Edit process', Process, { ...data, item: $selectedItem })}
								>
									<EditOutline class="h-4 w-6" /></Button
								>
								<DeleteButton
									path="/dashboard/IC/processes?/deleteProcess"
									name={'id'}
									identifier={$selectedItem.id}
								/>
							</div>
						</div>
					</li>

					<div class="flex flex-col pb-3">
						<p class="font-medium">Description</p>
						<p class="text-sm font-normal text-gray-500">
							{#if $selectedItem?.description}
								{$selectedItem?.description}
							{:else}
								<i>No description</i>
							{/if}
						</p>
					</div>
				</ul>
			{/if}
		</div>
	</div>
</div>
