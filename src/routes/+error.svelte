<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Card } from 'flowbite-svelte';
</script>

<div class="flex h-screen items-center justify-center">
	<Card class="max-w-[600px] space-y-4">
		<p class="text-center text-8xl font-bold tracking-tight text-gray-900 dark:text-white">
			{$page.status}
		</p>
		<p class="text-center text-lg font-light text-gray-500 dark:text-gray-400">
			{$page.error?.message}
		</p>
		<Button href="/">Back to Homepage</Button>
	</Card>
</div>
