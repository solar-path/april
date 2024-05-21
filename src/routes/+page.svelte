<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	export let data: PageData;
	import Login from '$lib/auth/forms/Login.svelte';
</script>

<svelte:head>
	<title></title>
	<meta name="description" content="page" />
</svelte:head>

<div class="flex items-center justify-center">
	<section class="bg-white dark:bg-gray-900">
		<div class="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
			<div class="mr-auto place-self-center lg:col-span-7">
				<div class="flex">
					<img src="/images/icon.png" class="h-14 w-14" alt="icon" />
					<h1
						class="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl"
					>
						chieving Excellence
					</h1>
				</div>
				<p class="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl">
					Experience a comprehensive solution designed to help businesses achieve excellence in
					various aspects of their operations. It offers a wide range of tools and resources that
					cover everything from strategic planning to process improvement, risk management, and
					more. With this solution, businesses might streamline their operations, reduce costs,
					increase efficiency, and ultimately, achieve greater success.
				</p>
				{#if data.email}
					<Button href="/dashboard">Get started</Button>
				{:else}
					<Button on:click={() => fillDrawer('Sign in', Login, data)}>Sign in</Button>
				{/if}
			</div>
			<div class="hidden lg:col-span-5 lg:mt-0 lg:flex">
				<img src="/images/landing.png" alt="stones" />
			</div>
		</div>
	</section>
</div>
