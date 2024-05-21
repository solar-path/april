<script lang="ts">
	import { Input, Label, Modal } from 'flowbite-svelte';
	import DisplayFormErrors from '$lib/components/DisplayFormErrors.svelte';
	import { createEventDispatcher } from 'svelte';
	import { FilterOutline } from 'flowbite-svelte-icons';
	import { treeState } from '$lib/components/Tree/TreeView.utilities';
	import TreeView from '$lib/components/Tree/TreeView.svelte';

	export let list: any[] = [];
	export let tree: any[] = [];
	export let form: any = {};
	export let errors: any = {};
	export let constraints: any;
	export let label: string;
	export let modalID: string;
	export let modalState: boolean = false;
	export let fieldId: string = 'parentId';
	export let fieldName: string = 'parent';

	let isDropdownOpen = false;
	let suggestions: any[] = [];
	let selectedIndex = -1;
	const dispatch = createEventDispatcher();

	const filterParents = () => {
		suggestions = list.filter((item: any) =>
			item.title.toLowerCase().includes(form[fieldName].toLowerCase())
		);
		isDropdownOpen = true;
		selectedIndex = -1;
	};

	const selectParent = (item: any) => {
		form[fieldName] = item.title;
		form[fieldId] = item.id;
		form.code = item.code; // Assuming 'code' is a fixed field
		suggestions = [];
		isDropdownOpen = false;
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

<Modal id={modalID} title={label} bind:open={modalState} autoclose={modalState}>
	<div class="flex flex-col">
		<div class="flex justify-end">
			<button
				type="button"
				class="text-sm text-red-700 hover:text-red-800"
				on:click={(event) => {
					event.stopPropagation();
					$treeState = $treeState === 'expanded' ? 'collapsed' : 'expanded';
				}}
			>
				{$treeState === 'expanded' ? 'Collapse' : 'Expand'}
			</button>
		</div>
		<div class="w-full">
			<TreeView
				{tree}
				option="select"
				showSelectButton={true}
				{form}
				on:itemSelected={() => (modalState = false)}
			/>
		</div>
	</div>
</Modal>
