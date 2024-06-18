<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { HomeOutline } from 'flowbite-svelte-icons';
	export let path;
	console.log('PathFinder :: path => ', path);

	// Remove 'http://' or 'https://'
	let cleanedPath = path.href.replace(/^https?:\/\//, '');
	// Split the path into parts
	let pathParts = cleanedPath.split('/');
	// Remove the 'localhost:5173' part
	pathParts.shift();
</script>

<Breadcrumb>
	<BreadcrumbItem href="/">
		<HomeOutline />
	</BreadcrumbItem>
	{#each pathParts as item}
		<BreadcrumbItem href={'/' + item}>{item}</BreadcrumbItem>
	{/each}
</Breadcrumb>
