<script lang="ts">
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import type { PageData } from '../$types';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
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

	// const reports = [
	// 	{ report: generatePdfStructureReport, title: 'Group Structure', type: 'PDF' },
	// 	{ report: generatePdfStructureReport, title: 'Group Structure', type: 'XLS' }
	// ];
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
			<!-- {#each reports as report}
				{#if report.type === fileType}
					<DropdownItem on:click={() => report.report(groupStructureTree)}
						>{report.title}</DropdownItem
					>
				{/if}
			{/each} -->
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
				<p>Title: {selectedStructureItem.title}</p>
			{/if}

			{#if selectedStructureItem && selectedStructureItem.type === 'region'}
				<p>Title: {selectedStructureItem.title}</p>
			{/if}

			{#if selectedStructureItem && selectedStructureItem.type === 'company'}
				<p>Title: {selectedStructureItem.title}</p>
				<p>
					Logo:
					<img src={selectedStructureItem.logo} alt={selectedStructureItem.title} />
				</p>
				<p>
					BIN:
					{selectedStructureItem.BIN}
				</p>
				<p>address: {selectedStructureItem.address}</p>
				<p>
					Contact:
					{selectedStructureItem.contact}
				</p>
			{/if}

			{#if selectedStructureItem && selectedStructureItem.type === 'department'}
				<p>Title: {selectedStructureItem.title}</p>
			{/if}

			{#if selectedStructureItem && selectedStructureItem.type === 'position'}
				<p>Title: {selectedStructureItem.title}</p>
			{/if}
		</div>
	</div>
</div>
