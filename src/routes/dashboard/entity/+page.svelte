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

	import {
		ChevronDownOutline,
		FileChartBarOutline,
		FilePdfOutline,
		PlusOutline
	} from 'flowbite-svelte-icons';

	export let data: PageData;

	let selectedStructureItem: any = null;
	$: groupStructureTree = data.groupStructureTree;

	const reports = [
		// Group
		{ item: 'Group Structure xls', title: 'Group Structure', type: 'PDF' },
		{ item: 'Group Structure pdf', title: 'Group Structure', type: 'XLS' },

		// Company
		{ item: 'Company orgchart as table', title: 'Orgchart table', type: 'PDF' },
		{ item: 'Company orgchart as table', title: 'Orgchart table', type: 'XLS' }
	];

	let dropdownStates = writable(new Map());

	const toggleDropdown = (id: any) => {
		dropdownStates.update((states) => {
			states.set(id, !states.get(id));
			return states;
		});
	};
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
						<button
							on:click={() => (selectedStructureItem = workspace)}
							on:contextmenu|preventDefault={() => toggleDropdown(workspace.id)}
							>{workspace.title}</button
						>
						{#if $dropdownStates.get(workspace.id)}
							<Dropdown>
								<DropdownItem>Add region</DropdownItem>
							</Dropdown>
						{/if}
						<ul class="ml-4">
							{#each workspace.regions as region}
								<li>
									<button
										on:click={() => (selectedStructureItem = region)}
										on:contextmenu|preventDefault={() => toggleDropdown(region.id)}
										>{region.title}</button
									>
									{#if $dropdownStates.get(region.id)}
										<Dropdown>
											<DropdownItem>Add company</DropdownItem>
										</Dropdown>
									{/if}
									<ul class="ml-4">
										{#each region.companies as company}
											<li>
												<button
													on:click={() => (selectedStructureItem = company)}
													on:contextmenu|preventDefault={() => toggleDropdown(company.id)}
													>{company.title}
												</button>
												{#if $dropdownStates.get(company.id)}
													<Dropdown>
														<DropdownItem>Add department</DropdownItem>
													</Dropdown>
												{/if}
												<ul class="ml-4">
													{#each company.departments as department}
														<li>
															<button
																on:click={() => (selectedStructureItem = department)}
																on:contextmenu|preventDefault={() => toggleDropdown(department.id)}
																>{department.title}</button
															>
															{#if $dropdownStates.get(department.id)}
																<Dropdown>
																	<DropdownItem>Add position</DropdownItem>
																</Dropdown>
															{/if}
															<ul class="ml-4">
																{#each department.positions as position}
																	<li>
																		<button
																			on:click={() => (selectedStructureItem = position)}
																			on:contextmenu|preventDefault={() =>
																				toggleDropdown(position.id)}>{position.title}</button
																		>
																		{#if $dropdownStates.get(position.id)}
																			<Dropdown>
																				<DropdownItem>Add position</DropdownItem>
																			</Dropdown>
																		{/if}
																	</li>
																{/each}
															</ul>
														</li>
													{/each}
												</ul>
											</li>
										{/each}
									</ul>
								</li>
							{/each}
						</ul>
					</li>
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
