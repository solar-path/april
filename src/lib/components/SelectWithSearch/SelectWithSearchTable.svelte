<script lang="ts">
	import { Button, Input, Label, List, Modal } from 'flowbite-svelte';
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { createEventDispatcher } from 'svelte';
	import { FilterOutline } from 'flowbite-svelte-icons';

	export let list: any[] = [];
	export let form: any = {};
	export let errors: any = {};
	export let constraints: any;
	export let label: string;
	export let modalID: string;
	export let fieldName: string = '';
	export let fieldId: string = '';
	export let tableLabel: string = '';
	export let tableDescription: string = '';
	export let modalState: boolean = false;

	let isDropdownOpen = false;
	let suggestions: any[] = [];
	let selectedIndex = -1;
	const dispatch = createEventDispatcher();

	// Pagination state
	let currentPage = 1;
	const itemsPerPage = 10;
	let totalPages = Math.ceil(list.length / itemsPerPage);

	let searchQuery = ''; // Reactive variable for search input

	// Reactive filter function to include search within the modal
	$: filteredList = list.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const filterParents = () => {
		suggestions = list.filter((item: any) =>
			item.title.toLowerCase().includes(form[fieldName].toLowerCase())
		);
		isDropdownOpen = true;
		selectedIndex = -1; // Reset selection when filtering
	};

	const selectItem = (item: any) => {
		form[fieldName] = item.title;
		form[fieldId] = item.id;
		suggestions = [];
		isDropdownOpen = false;
		dispatch('itemSelected', item);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowDown') {
			if (selectedIndex < suggestions.length - 1) {
				selectedIndex++;
			}
			event.preventDefault(); // Prevent scrolling the page
		} else if (event.key === 'ArrowUp') {
			if (selectedIndex > 0) {
				selectedIndex--;
			}
			event.preventDefault(); // Prevent scrolling the page
		} else if (event.key === 'Enter' && selectedIndex !== -1) {
			selectItem(suggestions[selectedIndex]);
			event.preventDefault(); // Prevent form submission
			event.stopPropagation(); // Stop event propagation
		}
	};

	const goToPage = (page: number) => {
		currentPage = page;
		totalPages = Math.ceil(list.length / itemsPerPage); // Recalculate total pages in case list size changes
	};
</script>

<input type="hidden" name={fieldId} bind:value={form[fieldId]} />

<Label for={fieldName}>{label}</Label>
<Input
	autoComplete="off"
	type="text"
	name={fieldName}
	bind:value={form[fieldName]}
	on:input={filterParents}
	on:focus={() => (isDropdownOpen = true)}
	on:blur={() => setTimeout(() => (isDropdownOpen = false), 200)}
	on:keydown={handleKeyDown}
	{...constraints[fieldName]}
>
	<button
		slot="left"
		class="pointer-events-auto"
		type="button"
		on:click={() => (modalState = true)}
	>
		<FilterOutline class="h-6 w-6" />
	</button>
</Input>
<DisplayFormErrors errors={errors.parent} />

{#if isDropdownOpen && suggestions.length > 0}
	<ul class="mt-1 max-h-36 overflow-auto rounded-md bg-white py-1 shadow-lg">
		{#each suggestions as item, index}
			<li>
				<button
					class="w-full cursor-pointer p-2 text-left hover:bg-gray-100 {index === selectedIndex
						? 'bg-gray-200'
						: ''}"
					on:click={() => selectItem(item)}
				>
					{item.title}
				</button>
			</li>
		{/each}
	</ul>
{/if}

<Modal id={modalID} title={label} bind:open={modalState} autoclose={!modalState}>
	<div class="flex w-full flex-col">
		<caption class="text-left text-2xl font-semibold text-gray-900">
			{tableLabel}
			<p class="mb-4 mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
				{tableDescription}
			</p>
		</caption>
		<!-- Search input for filtering within the modal -->
		<Input type="text" placeholder="Search..." bind:value={searchQuery} class="mb-4" />
	</div>
	<div class="flex w-full">
		<List list="none" class="w-full">
			{#each filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as item}
				<li class="group flex items-center justify-between">
					<span>{item.title}</span>
					<Button
						type="button"
						color="alternative"
						size="xs"
						class="opacity-0 group-hover:opacity-100"
						on:click={() => {
							selectItem(item);
							modalState = false;
						}}
					>
						Select
					</Button>
				</li>
			{/each}
		</List>
	</div>
	<div class="mt-2 flex justify-between">
		<Button
			type="button"
			color="alternative"
			size="xs"
			on:click={() => goToPage(currentPage - 1)}
			disabled={currentPage === 1}
		>
			Previous
		</Button>
		<span class="mx-2">Page {currentPage} of {totalPages}</span>
		<Button
			type="button"
			color="alternative"
			size="xs"
			on:click={() => goToPage(currentPage + 1)}
			disabled={currentPage === totalPages}
		>
			Next
		</Button>
	</div>
</Modal>
