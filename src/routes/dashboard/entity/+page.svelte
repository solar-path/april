<script lang="ts">
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import type { PageData } from '../$types';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import WorkspaceCard from './Cards/Workspace.card.svelte';
	import RegionCard from './Cards/Region.card.svelte';
	import CompanyCard from './Cards/Company.card.svelte';
	import DepartmentCard from './Cards/Department.card.svelte';
	import PositionCard from './Cards/Position.card.svelte';

	import {
		ChevronDownOutline,
		FileChartBarOutline,
		FilePdfOutline,
		PlusOutline
	} from 'flowbite-svelte-icons';

	export let data: PageData;

	let selectedStructureItem: any = null;
	$: console.log('selectedStructureItem => ', selectedStructureItem);
	$: groupStructureTree = data.groupStructureTree;
	console.log(data);

	const reports = [
		// Group
		{ item: 'Group Structure xls', title: 'Group Structure', type: 'PDF' },
		{ item: 'Group Structure pdf', title: 'Group Structure', type: 'XLS' },

		// Company
		{ item: 'Company orgchart as table', title: 'Orgchart table', type: 'PDF' },
		{ item: 'Company orgchart as table', title: 'Orgchart table', type: 'XLS' }
	];
</script>

<div class="mb-2 flex flex-row justify-end space-x-2">
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
					<!-- on:click={() => report.report(groupStructureTree)} place it in DropDownItem -->
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
			<ul>
				{#each groupStructureTree as workspace}
					<li>
						<button on:click={() => (selectedStructureItem = workspace)}>{workspace.title}</button>
					</li>
					<ul class="ml-4">
						{#each workspace.regions as region}
							<li>
								<button on:click={() => (selectedStructureItem = region)}>{region.title}</button>
							</li>
							<ul class="ml-4">
								{#each region.companies as company}
									<li>
										<button on:click={() => (selectedStructureItem = company)}
											>{company.title}</button
										>
									</li>
									<ul class="ml-4">
										{#each company.departments as department}
											<li>
												<button on:click={() => (selectedStructureItem = department)}
													>{department.title}</button
												>
											</li>
											<ul class="ml-4">
												{#each department.positions as position}
													<li>
														<button on:click={() => (selectedStructureItem = position)}
															>{position.title}</button
														>
													</li>
												{/each}
											</ul>
										{/each}
									</ul>
								{/each}
							</ul>
						{/each}
					</ul>
				{/each}
			</ul>
		</div>
		<div class="w-2/3">
			<p>Details:</p>
			{#if selectedStructureItem && selectedStructureItem.type === 'workspace'}
				<WorkspaceCard {selectedStructureItem} />
			{/if}

			{#if selectedStructureItem && selectedStructureItem.type === 'region'}
				<RegionCard {selectedStructureItem} />
			{/if}

			{#if selectedStructureItem && selectedStructureItem.type === 'company'}
				<CompanyCard {selectedStructureItem} />
			{/if}

			{#if selectedStructureItem && selectedStructureItem.type === 'department'}
				<DepartmentCard {selectedStructureItem} />
			{/if}

			{#if selectedStructureItem && selectedStructureItem.type === 'position'}
				<PositionCard {selectedStructureItem} />
			{/if}
		</div>
	</div>
</div>
