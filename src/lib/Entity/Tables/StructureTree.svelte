<script lang="ts">
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import TreeView from '$lib/components/Tree/TreeView.svelte';
	import { Button, Dropdown, DropdownItem, Input, Tooltip } from 'flowbite-svelte';
	import {
		ChevronDownOutline,
		EditOutline,
		FileChartBarOutline,
		FilePdfOutline,
		PlusOutline,
		SearchOutline
	} from 'flowbite-svelte-icons';
	import { selectedItem, treeState } from '$lib/components/Tree/TreeView.utilities';
	import DeleteButton from '$lib/components/DeleteButton.svelte';
	import { generatePdfStructureReport } from '$lib/Entity/Reports/pdf/structureReports';
	import { generateXlsStructureReport } from '$lib/Entity/Reports/xls/structureReports';
	import Entity from '$lib/Entity/Forms/Entity.svelte';

	export let data: any;
	$: console.log('structureTree :: data => ', data);
	let searchTerm = '';
</script>

<div class="mb-2 flex flex-row space-x-2">
	<Input placeholder="Search..." class="sm:w-84 rounded-lg md:w-2/3" bind:value={searchTerm}>
		<SearchOutline slot="left" class="text-gray-500" />
	</Input>

	<Button
		on:click={() => {
			fillDrawer('New entity', Entity, data);
		}}><PlusOutline /></Button
	>
	<Button color="alternative">Actions<ChevronDownOutline /></Button>

	<Dropdown class="w-44 divide-y divide-gray-100">
		<DropdownItem>Mass Edit</DropdownItem>
		<DropdownItem>Delete all</DropdownItem>
	</Dropdown>

	<Button
		color="alternative"
		type="button"
		on:click={() => generatePdfStructureReport(data.entityList)}
		><FilePdfOutline /><Tooltip>Export as PDF</Tooltip></Button
	>
	<Button
		color="alternative"
		type="button"
		on:click={() => generateXlsStructureReport(data.entityList)}
		><FileChartBarOutline /><Tooltip>Export as XLS</Tooltip></Button
	>
</div>

<div class="mt-2 flex w-full flex-col">
	<div class="flex w-full">
		<caption class="text-left text-2xl font-semibold text-gray-900">
			Business structure
			<p class="mb-4 mt-1 text-sm font-normal text-gray-500">
				Browse a list of company's in workspace.
			</p>
		</caption>
	</div>
	<div class="flex flex-row">
		<div class="w-1/3">
			<ul>
				<li class="flex justify-end">
					{#if $treeState === 'expanded'}
						<button
							type="button"
							class="text-sm text-red-700 hover:text-red-800"
							on:click={() => ($treeState = 'collapsed')}
							>Collapse
						</button>
					{:else}
						<button
							type="button"
							class="text-sm text-red-700 hover:text-red-800"
							on:click={() => ($treeState = 'expanded')}>Expand</button
						>
					{/if}
				</li>
				<li>
					<TreeView tree={data.entityTree} option="select" showSelectButton={false} />
				</li>
			</ul>
		</div>
		<div class="ml-8 w-2/3 space-y-2">
			{#if $selectedItem}
				<ul class="space-y-2">
					<li>
						<div class="flex flex-row">
							<div>
								<p class="font-medium">Entity:</p>
								<p class="text-sm font-normal text-gray-500">{$selectedItem.title}</p>
							</div>
							<div class="ml-auto flex flex-row justify-end space-x-2">
								<Button
									outline={true}
									class="h-9 w-10 !p-2"
									size="xs"
									on:click={() =>
										fillDrawer('Edit entity', Entity, { ...data, item: $selectedItem })}
								>
									<EditOutline class="h-4 w-6" /></Button
								>
								<DeleteButton
									path="/dashboard/Structure?/deleteUnit"
									name={'id'}
									identifier={$selectedItem.id}
								/>
							</div>
						</div>
					</li>

					<div class="flex flex-col pb-3">
						<p class="font-medium">Type:</p>
						<p class="text-sm font-normal text-gray-500">{$selectedItem.type}</p>
					</div>
					<div class="flex flex-col pb-3">
						<ul>
							{#each $selectedItem.children as child}
								<li>{child.title}</li>
							{/each}
						</ul>
					</div>
				</ul>
			{/if}
		</div>
	</div>
</div>
