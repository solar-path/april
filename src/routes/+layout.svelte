<script lang="ts">
	import type { LayoutData } from './$types';
	import { enhance } from '$app/forms';
	import '../app.pcss';
	import {
		Avatar,
		CloseButton,
		Drawer,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		Heading,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Navbar,
		DropdownDivider,
		Input,
		A
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import Workspace from '$lib/components/Workspace/Workspace.form.svelte';

	import { PlusOutline } from 'flowbite-svelte-icons';
	import { drawerContent, hideDrawer } from '$lib/components/Drawer/drawer.utlities';

	import { inject } from '@vercel/analytics';
	import { dev } from '$app/environment';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import AnekoFooter from '$lib/components/AnekoFooter.svelte';

	export let data: LayoutData;

	$: workspaceList = data.workspaceList;

	$: fullname = data.currentUser?.name + ' ' + data.currentUser?.surname;

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="flex min-h-screen flex-col justify-between">
	<Navbar>
		<NavBrand href="/">
			<img src="/images/logo.png" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				Achieving Excellence
			</span>
		</NavBrand>
		{#if data.currentUser}
			<div class="flex items-center space-x-4 md:order-2">
				<Input type="text" placeholder="Search" class="w-full md:w-64" size="md"
					><SearchOutline slot="left" class="h-4 w-4" />
				</Input>
				<Avatar id="avatar-menu" src={data.currentUser.avatar} />

				<Dropdown placement="bottom" triggeredBy="#avatar-menu">
					<DropdownHeader>
						<span class="block text-sm italic text-gray-900">{fullname} </span>
						<A
							href="mailto:{data.currentUser.email}"
							target="_blank"
							class="block truncate text-sm ">{data.currentUser.email}</A
						>
					</DropdownHeader>

					<DropdownItem href="/profile">Profile</DropdownItem>
					<DropdownItem href="/dashboard">Billing</DropdownItem>
					<DropdownDivider />
					<form method="POST" use:enhance action="/logout">
						<DropdownItem>
							<button type="submit">Sign out</button>
						</DropdownItem>
					</form>
				</Dropdown>
			</div>
		{/if}
		<NavHamburger />
		<NavUl>
			<NavLi href="/pricing">Pricing</NavLi>
			<NavLi href="/learn">Learn & Support</NavLi>
			{#if data.currentUser}
				<NavLi>
					<button
						id="selectWorkspace"
						class="flex items-center justify-center gap-2 text-primary-700"
					>
						<p>Workspace:</p>
						{#if workspaceList.find((workspace) => workspace.workspace === $page.params.workspace)?.logo}
							<Avatar
								src={`/images/logo/${
									workspaceList.find((workspace) => workspace.workspace === $page.params.workspace)
										?.logo
								}`}
								size="sm"
								class="mx-auto"
							/>
						{/if}
						{workspaceList.find((workspace) => workspace.workspace === $page.params.workspace)
							?.title || 'Select one'}
					</button>

					<Dropdown class="w-full" triggeredBy="#selectWorkspace">
						{#each workspaceList.filter((workspace) => workspace.workspace !== $page.params.workspace) as workspace}
							<DropdownItem
								href={`/${workspace.workspace}`}
								class="w-full hover:bg-primary-700 hover:text-white"
							>
								<div class="justify-left flex flex-row items-center gap-2">
									{#if workspace.logo}
										<Avatar src={`/images/logo/${workspace.logo}`} size="sm" />
									{/if}
									{workspace.title}
								</div>
							</DropdownItem>
						{/each}
						<DropdownItem
							slot="footer"
							on:click={() => fillDrawer('Create new workspace', Workspace, data)}
							class="flex items-center justify-start gap-2 hover:bg-primary-700 hover:text-white"
						>
							<PlusOutline class="h-4 w-4" />
							Create new workspace
						</DropdownItem>
					</Dropdown>
				</NavLi>

				<NavLi>
					<button
						id="selectCompany"
						class="flex items-center justify-center gap-2 text-primary-700"
					>
						<p>Company</p>
					</button>
				</NavLi>
			{:else}
				<NavLi href="/register">Join us</NavLi>

				<NavLi href="/login">
					<span class="rounded-lg bg-red-700 pb-2 pl-4 pr-4 pt-2 text-white hover:bg-red-900"
						>Sign in</span
					>
				</NavLi>
			{/if}
		</NavUl>
	</Navbar>

	<main class="flex-grow p-16">
		<slot />
	</main>

	<AnekoFooter {data} />
</div>

<Drawer
	placement="right"
	class="w-1/4"
	activateClickOutside={false}
	transitionType="fly"
	bind:hidden={$hideDrawer}
>
	<div class="flex items-center justify-between">
		<Heading tag="h3" id="drawer-label" class="mb-2">{$drawerContent?.title}</Heading>
		<CloseButton on:click={() => ($hideDrawer = !$hideDrawer)} class="mb-4 dark:text-white" />
	</div>
	<div>
		<svelte:component this={$drawerContent?.content} {...$drawerContent?.props} />
	</div>
</Drawer>
\====
