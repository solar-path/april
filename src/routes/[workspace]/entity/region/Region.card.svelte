<script lang="ts">
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { Button, Heading, Hr, P } from 'flowbite-svelte';
	import { EditOutline } from 'flowbite-svelte-icons';
	import Region from './Region.form.svelte';
	import DeleteButton from '$lib/components/DeleteButton.svelte';
	import { page } from '$app/stores';
	export let selectedStructureItem;
	export let data;
</script>

<div class="flex">
	<div>
		<Heading tag="h4">Unit details (Region):</Heading>
	</div>
	<div class="ml-auto flex flex-row justify-end space-x-2">
		<Button
			outline={true}
			class="h-9 w-10 !p-2"
			size="xs"
			on:click={() => fillDrawer('Edit region', Region, { ...data, item: selectedStructureItem })}
		>
			<EditOutline class="h-4 w-6" /></Button
		>
		<DeleteButton
			path="/{$page.params.workspace}/entity/region?/deleteRegion"
			name={'id'}
			identifier={selectedStructureItem.id}
		/>
	</div>
</div>
<Hr classHr="my-2" />

<strong class="font-semibold text-gray-900 dark:text-white">Title: </strong>
<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400"
	>{selectedStructureItem.title}</P
>
<strong class="font-semibold text-gray-900 dark:text-white">Description: </strong>
<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">
	{selectedStructureItem.description === null
		? 'No description'
		: selectedStructureItem.description}
</P>
