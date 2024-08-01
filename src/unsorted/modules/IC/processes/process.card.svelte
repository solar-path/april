<script lang="ts">
	import DeleteButton from '$lib/components/DeleteButton.svelte';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';

	import { Button } from 'flowbite-svelte';
	import { EditOutline } from 'flowbite-svelte-icons';
</script>

<ul class="space-y-2">
	<li>
		<div class="flex flex-row">
			<div>
				<p class="font-medium">Process</p>
				<p class="text-sm font-normal text-gray-500">{$selectedItem?.title}</p>
			</div>
			<div class="ml-auto flex flex-row justify-end space-x-2">
				<Button
					outline={true}
					class="h-9 w-10 !p-2"
					size="xs"
					on:click={() => fillDrawer('Edit process', Process, { ...data, item: $selectedItem })}
				>
					<EditOutline class="h-4 w-6" /></Button
				>
				<DeleteButton
					path="/dashboard/IC/processes?/deleteProcess"
					name={'id'}
					identifier={$selectedItem.id}
				/>
			</div>
		</div>
	</li>

	<div class="flex flex-col pb-3">
		<p class="font-medium">Description</p>
		<p class="text-sm font-normal text-gray-500">
			{#if $selectedItem?.description}
				{$selectedItem?.description}
			{:else}
				<i>No description</i>
			{/if}
		</p>
	</div>
</ul>
