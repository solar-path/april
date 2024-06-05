<script lang="ts">
	export let selectedStructureItem;
	import { Heading, Hr, P } from 'flowbite-svelte';
</script>

<Heading tag="h4">Unit details:</Heading>
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

<strong class="font-semibold text-gray-900 dark:text-white">Logo: </strong>
<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">
	<img src={selectedStructureItem.logo} alt={selectedStructureItem.title} />
</P>

<strong class="font-semibold text-gray-900 dark:text-white">BIN: </strong>
<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">
	{selectedStructureItem.BIN}
</P>

<strong class="font-semibold text-gray-900 dark:text-white">address: </strong>
<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">
	{selectedStructureItem.address}
</P>

<strong class="font-semibold text-gray-900 dark:text-white">Contact: </strong>
<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">
	{selectedStructureItem.contact}
</P>
