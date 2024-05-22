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
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink
	} from 'flowbite-svelte';
	import Login from '$lib/auth/forms/Login.svelte';
	import Register from '$lib/auth/forms/Register.svelte';
	import Contact from '$lib/forms/contact/Contact.svelte';
	import { drawerContent, fillDrawer, hideDrawer } from '$lib/components/Drawer/drawer.utlities';

	import { inject } from '@vercel/analytics';
	import { dev } from '$app/environment';

	export let data: LayoutData;

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="flex min-h-screen flex-col justify-between">
	<Navbar>
		<NavBrand href="/">
			<img src="/images/logo.png" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>Achieving Excellence</span
			>
		</NavBrand>
		<NavHamburger />
		<NavUl class="items-center">
			<NavLi href="/pricing">Pricing</NavLi>
			<NavLi href="/learn">Learn & Support</NavLi>
			{#if data.currentUser}
				<NavLi href="/admin">Admin</NavLi>
				<NavLi href="/dashboard">Dashboard</NavLi>
				<Avatar id="avatar-menu" />
				<Dropdown placement="bottom" triggeredBy="#avatar-menu">
					<DropdownHeader>
						<span class="block truncate text-sm font-medium">{data.currentUser.email}</span>
					</DropdownHeader>

					<form method="POST" use:enhance action="/auth?/logout">
						<DropdownItem>
							<button type="submit">Sign out</button>
						</DropdownItem>
					</form>
				</Dropdown>
			{:else}
				<NavLi on:click={() => fillDrawer('Sign up', Register, data)}>Join us</NavLi>

				<NavLi on:click={() => fillDrawer('Sign in', Login, data)}>
					<span class="rounded-lg bg-red-700 pb-2 pl-4 pr-4 pt-2 text-white hover:bg-red-900"
						>Sign in</span
					>
				</NavLi>
			{/if}
		</NavUl>
	</Navbar>

	<main class="flex-grow p-32">
		<slot />
	</main>

	<Footer footerType="logo">
		<div class="sm:flex sm:items-center sm:justify-between">
			<FooterCopyright href="/" by="Aneko" />

			<FooterLinkGroup ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0">
				<FooterLink>
					<button on:click={() => fillDrawer('Contact Us', Contact, data)}> Contact Us </button>
				</FooterLink>
				<FooterLink href="/terms">Terms & conditions</FooterLink>
			</FooterLinkGroup>
		</div>
	</Footer>
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
