<script lang="ts">
	import { Input, Label, Modal } from 'flowbite-svelte';
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { FilterOutline } from 'flowbite-svelte-icons';
	import { formStore } from '$lib/components/form/formStore';
	import TreeView from '../Tree/TreeView.svelte';
	import { selectedItem } from '../Tree/TreeView.utilities';

	export let list: any[] = [];
	export let tree: any[] = [];
	export let form: any = {};
	export let errors: any = {};
	export let constraints: any;
	export let label: string;
	export let modalID: string;
	export let modalState: boolean = false;
	export let fieldId: string;
	export let fieldName: string;

	let isDropdownOpen = false;
	let suggestions: any[] = [];
	let selectedIndex = -1;
	const dispatch = createEventDispatcher();

	$: filterParents = () => {
		suggestions = list.filter((item: any) =>
			item.title.toLowerCase().includes(form[fieldName].toLowerCase())
		);
		isDropdownOpen = true;
		selectedIndex = -1;
	};

	const selectParent = (item: any) => {
		form[fieldName] = item.title;
		form[fieldId] = item.id;
		formStore.update((store) => {
			store[fieldId] = { fieldId: item.id, fieldName: item.title };
			return store;
		});
		suggestions = [];
		isDropdownOpen = false;
		modalState = true; // Close the modal
		dispatch('itemSelected', item);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowDown' && selectedIndex < suggestions.length - 1) {
			selectedIndex++;
			event.preventDefault();
		} else if (event.key === 'ArrowUp' && selectedIndex > 0) {
			selectedIndex--;
			event.preventDefault();
		} else if (event.key === 'Enter' && selectedIndex !== -1) {
			selectParent(suggestions[selectedIndex]);
			event.preventDefault();
			event.stopPropagation();
		}
	};

	onMount(() => {
		selectedItem.set(null);
	});

	$: console.log('SelectWithSearchTree :: selectedItem => ', $selectedItem);
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
<DisplayFormErrors errors={errors[fieldName]} />

{#if isDropdownOpen && suggestions.length > 0}
	<ul class="mt-1 max-h-36 overflow-auto rounded-md bg-white py-1 shadow-lg">
		{#each suggestions as item, index}
			<li>
				<button
					class="w-full cursor-pointer p-2 text-left hover:bg-gray-100 {index === selectedIndex
						? 'bg-gray-200'
						: ''}"
					on:click={() => selectParent(item)}
				>
					{item.title}
				</button>
			</li>
		{/each}
	</ul>
{/if}

<Modal id={modalID} title={label} bind:open={modalState}>
	<TreeView {tree} {form} option="select" {fieldId} {fieldName} />
</Modal>
