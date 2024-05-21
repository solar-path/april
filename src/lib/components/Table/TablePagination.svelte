<script lang="ts">
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import { ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	export let totalPages: number;
	export let currentPage: number;

	const dispatch = createEventDispatcher();

	function updatePage(newPage: number) {
		if (newPage >= 1 && newPage <= totalPages) {
			dispatch('pageChange', newPage);
		}
	}
</script>

<div class="mt-2">
	{#if totalPages > 1}
		<div class="flex items-center justify-end space-x-2">
			<ButtonGroup>
				<Button on:click={() => updatePage(currentPage - 1)} class="p-2">
					<ChevronLeftOutline class="h-5 w-5" />
					<span class="sr-only">Previous</span>
				</Button>
				{#each Array(totalPages).fill(0) as _, i (i)}
					<Button
						class="w-10 p-2"
						color={currentPage === i + 1 ? 'red' : 'alternative'}
						on:click={() => updatePage(i + 1)}>{i + 1}</Button
					>
				{/each}
				<Button on:click={() => updatePage(currentPage + 1)} class="p-2">
					<ChevronRightOutline class="h-5 w-5" />
					<span class="sr-only">Next</span>
				</Button>
			</ButtonGroup>
		</div>
	{/if}
</div>
