<script lang="ts">
	import { writable } from 'svelte/store';
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import type { PageData } from '../$types';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import WorkspaceCard from './Cards/Workspace.card.svelte';
	import RegionCard from './Cards/Region.card.svelte';
	import CompanyCard from './Cards/Company.card.svelte';
	import DepartmentCard from './Cards/Department.card.svelte';
	import PositionCard from './Cards/Position.card.svelte';

	import Workspace from './Forms/Workspace.form.svelte';
	import Region from './Forms/Region.form.svelte';
	import Company from './Forms/Company.form.svelte';
	import Department from './Forms/Department.form.svelte';
	import Position from './Forms/Position.form.svelte';

	import { ChevronDownOutline, FileChartBarOutline, FilePdfOutline } from 'flowbite-svelte-icons';
	import TreeView from '$lib/components/Tree/TreeView.svelte';
	import { selectedItem } from '$lib/components/Tree/TreeView.utilities';

	export let data: PageData;

	$: groupStructureTree = data.groupStructureTree;

	const reports = [
		// Group
		{ item: 'Group Structure xls', title: 'Group Structure', type: 'PDF' },
		{ item: 'Group Structure pdf', title: 'Group Structure', type: 'XLS' },

		// Company
		{ item: 'Company orgchart as table', title: 'Orgchart table', type: 'PDF' },
		{ item: 'Company orgchart as table', title: 'Orgchart table', type: 'XLS' }
	];

	const formList = [
		{ title: 'Workspace', form: Workspace },
		{ title: 'Region', form: Region },
		{ title: 'Company', form: Company },
		{ title: 'Department', form: Department },
		{ title: 'Position', form: Position }
	];
</script>

<div class="mb-2 flex flex-row justify-end space-x-2">
	<Button>Add new<ChevronDownOutline /></Button>

	<Dropdown class="w-44 divide-y divide-gray-100">
		{#each formList as item}
			<DropdownItem
				on:click={() => {
					fillDrawer(`New ${item.title}`, item.form, data);
				}}
				class="flex"
			>
				{item.title}
			</DropdownItem>
		{/each}
	</Dropdown>

	<Button color="alternative">Actions<ChevronDownOutline /></Button>

	<Dropdown class="w-44 divide-y divide-gray-100">
		<DropdownItem>Mass Edit</DropdownItem>
		<DropdownItem>Delete all</DropdownItem>
	</Dropdown>

	{#each ['PDF', 'XLS'] as fileType}
		<Button color="alternative" type="button">
			{#if fileType === 'PDF'}
				<FilePdfOutline />
			{:else if fileType === 'XLS'}
				<FileChartBarOutline />
			{/if}
			<ChevronDownOutline />
		</Button>
		<Dropdown class="w-44 divide-y divide-gray-100">
			{#each reports as report}
				{#if report.type === fileType}
					<DropdownItem>{report.title}</DropdownItem>
				{/if}
			{/each}
		</Dropdown>
	{/each}
</div>

<div class="mt-2 flex w-full flex-col">
	<div class="flex w-full">
		<caption class="text-left text-2xl font-semibold text-gray-900">
			Group structure
			<p class="mb-4 mt-1 text-sm font-normal text-gray-500">Browse group structure.</p>
		</caption>
	</div>
	<div class="flex flex-row">
		<div class="w-1/3">
			{#if groupStructureTree}
				<TreeView form={null} showSelectButton={false} tree={groupStructureTree} option="select" />
			{:else}
				<p>No items was created</p>
			{/if}
		</div>
		<div class="w-2/3">
			{#if $selectedItem}
				<p>Details:</p>
				{#if $selectedItem.type === 'workspace'}
					<WorkspaceCard selectedStructureItem={$selectedItem} />
				{/if}

				{#if $selectedItem.type === 'region'}
					<RegionCard selectedStructureItem={$selectedItem} />
				{/if}

				{#if $selectedItem.type === 'company'}
					<CompanyCard selectedStructureItem={$selectedItem} />
				{/if}

				{#if $selectedItem.type === 'department'}
					<DepartmentCard selectedStructureItem={$selectedItem} />
				{/if}

				{#if $selectedItem.type === 'position'}
					<PositionCard selectedStructureItem={$selectedItem} />
				{/if}
			{/if}
		</div>
	</div>
</div>
