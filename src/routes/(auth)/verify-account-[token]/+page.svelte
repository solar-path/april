<script lang="ts">
	import { Button, Card, Heading, Hr, P } from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	$: heading = data.heading;
	$: message = data.message;
	console.log('/verify-account-token/+page.svelte :: data =>', data);
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<Card class="flex flex-col space-y-6" size="lg" padding="xl">
		<Heading tag="h2" class="text-center">{heading}</Heading>
		<Hr />
		<P weight="light" color="text-gray-500" class="text-justify">{message}</P>

		{#if heading === 'Account Verified'}
			<Button href="/login">Sign in</Button>
		{/if}
	</Card>
</div>
