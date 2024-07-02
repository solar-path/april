<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Dropdown,
		Input,
		DropdownItem,
		Avatar,
		A
	} from 'flowbite-svelte';
	import {
		ArrowDownOutline,
		ArrowUpOutline,
		ChevronDownOutline,
		FileChartBarOutline,
		FilePdfOutline,
		PlusOutline,
		SearchOutline,
		EditOutline
	} from 'flowbite-svelte-icons';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import TablePagination from '$lib/components/Table/TablePagination.svelte';
	import {
		currentPage,
		filterAndSearch,
		itemsPerPage,
		sortData,
		sortDirection,
		sortItems,
		sortKey,
		sortTable,
		totalPages
	} from '$lib/components/Table/table.utilities';

	import DeleteButton from '$lib/components/DeleteButton.svelte';

	export let tableLabel: string = '';
	export let tableDescription: string = '';
	export let createItemLabel: string = '';
	export let updateItemLabel: string = '';
	export let list: any[] = [];
	export let formName: any = {};
	export let deleteURL: string = '';
	export let reports: any[] = [];
	export let showToolBar: boolean = false;
	export let columns: { label: string; key: string; type: string }[] = [];
	let searchTerm = '';
	export let data = {};
	$sortItems = list.slice();

	$: list, sortItems.set(filterAndSearch(list, searchTerm)), sortData($sortItems, $sortDirection);
</script>

<div class="mb-2 flex flex-row space-x-2">
	<Input placeholder="Search..." class="sm:w-84 rounded-lg md:w-2/3" bind:value={searchTerm}>
		<SearchOutline slot="left" class="text-gray-500" />
	</Input>

	{#if showToolBar}
		<Button
			on:click={() => {
				fillDrawer(createItemLabel, formName, data);
			}}><PlusOutline /></Button
		>
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
						<DropdownItem on:click={() => report.report(list)}>{report.title}</DropdownItem>
					{/if}
				{/each}
			</Dropdown>
		{/each}
	{/if}
</div>

<div class="flex w-full">
	<caption class="text-left text-2xl font-semibold text-gray-900">
		{tableLabel}
		<p class="mb-4 mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
			{tableDescription}
		</p>
	</caption>
</div>

<Table hoverable={true}>
	<TableHead>
		{#each columns as column}
			<TableHeadCell padding="px-4 py-3" on:click={() => sortTable(column.key)} scope="col">
				<span class="flex flex-row">
					{column.label}
					{#if $sortKey === column.key}
						{#if $sortDirection === 1}
							<ArrowUpOutline />
						{:else}
							<ArrowDownOutline />
						{/if}
					{/if}
				</span>
			</TableHeadCell>
		{/each}
		<TableHeadCell padding="px-4 py-3">Actions</TableHeadCell>
	</TableHead>
	<TableBody>
		{#if $sortItems.length > 0}
			{#each $sortItems.slice(($currentPage - 1) * itemsPerPage, $currentPage * itemsPerPage) as item (item.id)}
				<TableBodyRow class="group relative">
					{#each columns as column}
						<TableBodyCell tdClass="px-4 py-3">
							{#if column.type === 'id'}
								{item[column.key].slice(0, 6)}
							{:else if column.type === 'phone'}
								<A href={`tel:${item[column.key]}`}>{item[column.key]}</A>
							{:else if column.type === 'email'}
								<A href={`mailto:${item[column.key]}`}>{item[column.key]}</A>
							{:else if column.type === 'avatar'}
								<Avatar src={item[column.key]} alt="avatar" />
							{:else if column.type === 'date'}
								{new Date(item[column.key]).toLocaleDateString()}
							{:else if column.type === 'boolean'}
								{item[column.key] ? 'Yes' : 'No'}
							{:else}
								{item[column.key]}
							{/if}
						</TableBodyCell>
					{/each}
					<TableBodyCell tdClass="flex flex-row px-4 py-3 w-auto items-center justify-between">
						<div
							class="flex flex-row space-x-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						>
							<Button
								outline={true}
								class="!p-2"
								size="xs"
								on:click={() => fillDrawer(updateItemLabel, formName, { ...data, item })}
							>
								<EditOutline class="h-4 w-6" /></Button
							>
							<DeleteButton path={deleteURL} name={'id'} identifier={item.id} />
						</div>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		{:else}
			<TableBodyRow>
				<TableBodyCell colspan="3">No results found</TableBodyCell>
			</TableBodyRow>
		{/if}
	</TableBody>
</Table>

<TablePagination
	totalPages={$totalPages}
	currentPage={$currentPage}
	on:pageChange={(e) => currentPage.set(e.detail)}
/>
