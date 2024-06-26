<script lang="ts">
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { page } from '$app/stores';
	import Workspace from '$lib/components/Workspace/Workspace.form.svelte';
	export let data: PageData;
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
				{#if $page.data.currentUser}
					{#if data.workspaceList?.length === 0 || data.workspaceList === undefined}
						<Button on:click={() => fillDrawer('Create new workspace', Workspace, data)}>
							Create new workspace
						</Button>
					{:else if data.workspaceList.length > 0}
						<Button>
							Select workspace to continue
							<ChevronDownOutline class="ms-2 h-6 w-6 text-white" />
						</Button>

						<Dropdown>
							{#each data.workspaceList as workspace}
								<DropdownItem href={`/${workspace.slug}`}>{workspace.title}</DropdownItem>
							{/each}
						</Dropdown>
					{:else}
						<Button href={`/${data.workspaceList[0].slug}`}>Get started</Button>
					{/if}
				{:else}
					<Button href="/login">Sign in</Button>
				{/if}
			</div>
			<div class="hidden lg:col-span-5 lg:mt-0 lg:flex">
				<img src="/images/landing.png" alt="stones" />
			</div>
		</div>
	</section>
</div>
