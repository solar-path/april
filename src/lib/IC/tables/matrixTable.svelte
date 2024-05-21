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
		Tooltip
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
	import TablePagination from '$lib/components/Table/TablePagination.svelte';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
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
	import { generateXlsMatrixReport } from '$lib/IC/Reports/xls/matrixReport';
	import Matrix from '$lib/IC/forms/Matrix.svelte';
	import { generatePdfMatrixReport } from '../Reports/pdf/MatrixReport';
	export let data: any;
	let matrixList = data?.matrixList || [];
	let searchTerm = '';

	$sortItems = matrixList.slice();

	$: matrixList,
		sortItems.set(filterAndSearch(matrixList, searchTerm)),
		sortData($sortItems, $sortDirection);

	let defaultModal = false;
</script>

<div class="mb-2 flex flex-row space-x-2">
	<Input placeholder="Search..." class="sm:w-84 rounded-lg md:w-2/3" bind:value={searchTerm}>
		<SearchOutline slot="left" class="text-gray-500" />
	</Input>

	<Button
		on:click={() => {
			fillDrawer('New matrix', Matrix, data);
		}}
	>
		<PlusOutline />
	</Button>
	<Button color="alternative">Actions<ChevronDownOutline /></Button>

	<Dropdown class="w-44 divide-y divide-gray-100">
		<DropdownItem>Mass Edit</DropdownItem>
		<DropdownItem>Delete all</DropdownItem>
	</Dropdown>

	<Button color="alternative" type="button" on:click={() => generatePdfMatrixReport(matrixList)}
		><FilePdfOutline /><Tooltip>Export as PDF</Tooltip></Button
	>
	<Button color="alternative" type="button" on:click={() => generateXlsMatrixReport(matrixList)}
		><FileChartBarOutline /><Tooltip>Export as XLS</Tooltip></Button
	>
</div>
<div class="flex w-full">
	<caption class="text-left text-2xl font-semibold text-gray-900">
		Matrix
		<p class="mb-4 mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
			Browse a list of risk and control matrix.
		</p>
	</caption>
</div>

<Table hoverable={true}>
	<TableHead>
		{#each ['code', 'title', 'description'] as column}
			<TableHeadCell padding="px-4 py-3" on:click={() => sortTable(column)} scope="col">
				<span class="flex flex-row">
					{column[0].toUpperCase() + column.slice(1)}
					{#if $sortKey === column}
						{#if $sortDirection === 1}
							<ArrowUpOutline />
						{:else}
							<ArrowDownOutline />
						{/if}
					{/if}
				</span>
			</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody>
		{#if $sortItems.length > 0}
			{#each $sortItems.slice(($currentPage - 1) * itemsPerPage, $currentPage * itemsPerPage) as item (item.id)}
				<TableBodyRow>
					<TableBodyCell
						tdClass="flex flex-row px-4 py-3 w-48 relative group items-center justify-between"
					>
						{item.code}
						<div
							class="flex flex-row space-x-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						>
							<Button
								outline={true}
								class="!p-2"
								size="xs"
								on:click={() => fillDrawer('Edit matrix', Matrix, { ...data, item })}
							>
								<EditOutline class="h-4 w-6" /></Button
							>
							<DeleteButton
								path="/dashboard/IC?/deleteMatrix"
								name={'code'}
								identifier={item.code}
							/>
						</div>
					</TableBodyCell>
					<TableBodyCell tdClass="px-4 py-3 ">{item.title}</TableBodyCell>
					<TableBodyCell tdClass="px-4 py-3 w-1/3">{item.description}</TableBodyCell>
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
