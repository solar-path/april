<script lang="ts">
	import { Button, Dropdown, DropdownItem, ListPlaceholder } from 'flowbite-svelte';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import WorkspaceCard from '../../lib/components/Workspace/Workspace.card.svelte';
	import RegionCard from '../../routes/[slug]/entity/region/Region.card.svelte';
	import CompanyCard from '../../routes/[slug]/entity/company/Company.card.svelte';
	import DepartmentCard from '../../routes/[slug]/entity/department/Department.card.svelte';
	import PositionCard from '../../routes/[slug]/entity/position/Position.card.svelte';

	import Region from '../../routes/[slug]/entity/region/Region.form.svelte';
	import Company from '../../routes/[slug]/entity/company/Company.form.svelte';
	import Department from '../../routes/[slug]/entity/department/Department.form.svelte';
	import Position from '../../routes/[slug]/entity/position/Position.form.svelte';

	import { ChevronDownOutline, FileChartBarOutline, FilePdfOutline } from 'flowbite-svelte-icons';
	import TreeView from '$lib/components/Tree/TreeView.svelte';
	import { selectedItem } from '$lib/components/Tree/TreeView.utilities';

	interface GroupStructureData {
		id: string;
		type: string;
		title: string;
		description: string;
	}
	export let data: any;
	console.log('entity/+page.svelte :: data => ', data);

	$: groupStructureTree = data.groupStructureTree as GroupStructureData[];

	const reports = [
		// Group
		{ item: 'Group Structure xls', title: 'Group Structure', type: 'PDF' },
		{ item: 'Group Structure pdf', title: 'Group Structure', type: 'XLS' },

		// Company
		{ item: 'Company orgchart as table', title: 'Orgchart table', type: 'PDF' },
		{ item: 'Company orgchart as table', title: 'Orgchart table', type: 'XLS' }
	];

	const formList = [
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
				<TreeView form={null} tree={groupStructureTree} option="select" route="" />
			{:else}
				<ListPlaceholder />
			{/if}
		</div>
		<div class="w-2/3">
			{#if $selectedItem}
				{#if $selectedItem.type === 'workspace'}
					<WorkspaceCard selectedStructureItem={$selectedItem} {data} />
				{/if}

				{#if $selectedItem.type === 'region'}
					<RegionCard selectedStructureItem={$selectedItem} {data} />
				{/if}

				{#if $selectedItem.type === 'company'}
					<CompanyCard selectedStructureItem={$selectedItem} {data} />
				{/if}

				{#if $selectedItem.type === 'department'}
					<DepartmentCard selectedStructureItem={$selectedItem} {data} />
				{/if}

				{#if $selectedItem.type === 'position'}
					<PositionCard selectedStructureItem={$selectedItem} {data} />
				{/if}
			{/if}
		</div>
	</div>
</div>
