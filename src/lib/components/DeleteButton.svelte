<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from 'flowbite-svelte';
	import { TrashBinOutline } from 'flowbite-svelte-icons';
	export let name: string;
	export let path: string;
	export let identifier: string;
	export let showBinIcon: boolean = true;
</script>

<form method="POST" use:enhance action={path}>
	<input type="hidden" {name} bind:value={identifier} />
	<Button outline={true} type="submit" size="xs">
		{#if showBinIcon}
			<TrashBinOutline class="h-4 w-4" />
		{/if}
	</Button>
</form>
