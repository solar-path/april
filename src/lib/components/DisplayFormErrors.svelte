<script lang="ts">
	import { Helper, List } from 'flowbite-svelte';
	export let errors: any;
</script>

{#if errors}
	<Helper color="red">
		<List>
			{#each errors as item}
				<li>{item}</li>
			{/each}
		</List>
	</Helper>
{/if}
