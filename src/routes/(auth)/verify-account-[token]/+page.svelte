<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	$: heading = data.heading;
	$: message = data.message;
	console.log('/verify-account-token/+page.svelte :: data =>', data);
</script>

<div>
	<h1>{heading}</h1>
	<p>{message}</p>

	{#if heading === 'Account Verified'}
		<a href="/login">Sign in</a>
	{/if}
</div>
