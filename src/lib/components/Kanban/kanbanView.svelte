<script lang="ts">
	import { Select, Label, Card } from 'flowbite-svelte';
	import { writable } from 'svelte/store';
	export let entityList: any;

	let selectedKey = writable(entityList[0]?.key); // default key taken from entityList
	let uniqueValues: any = [];

	$: $selectedKey,
		(uniqueValues = Array.from(new Set(entityList.map((entity) => entity[$selectedKey]))));
</script>

<div class="mb-4 flex flex-row items-center">
	<Label for="keySelect" class="w-36">Select Key</Label>
	<Select bind:value={$selectedKey} id="keySelect" class="ml-2">
		{#each Object.keys(entityList[0]) as key}
			<option value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>
		{/each}
	</Select>
</div>

<!-- Using Tailwind CSS for layout -->
<div class="flex flex-row gap-4">
	{#each uniqueValues as value}
		<div class="flex-1">
			<div class="rounded-t-lg bg-gray-200 p-2 text-center font-bold">{value}</div>
			<div class="flex flex-col gap-2 rounded-b-lg bg-gray-100 p-2">
				{#each entityList.filter((entity) => entity[$selectedKey] === value) as filteredEntity}
					<Card class="rounded-lg bg-white p-4 shadow">{filteredEntity.title}</Card>
					<!-- Assuming title is a common property to display -->
				{/each}
			</div>
		</div>
	{/each}
</div>
