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
		FooterLink,
		FooterBrand,
		FooterIcon
	} from 'flowbite-svelte';
	import Contact from '$lib/forms/contact/Contact.svelte';
	import { drawerContent, fillDrawer, hideDrawer } from '$lib/components/Drawer/drawer.utlities';

	import { inject } from '@vercel/analytics';
	import { dev } from '$app/environment';
	import {
		DiscordSolid,
		FacebookSolid,
		GithubSolid,
		LinkedinSolid,
		TwitterSolid
	} from 'flowbite-svelte-icons';

	export let data: LayoutData;

	let fullname = data.currentUser?.name + ' ' + data.currentUser?.surname;

	console.log('+layout.svelte :: data', data);

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
				{#if data.currentUser.email === 'itgroup.luck@gmail.com'}
					<NavLi href="/admin">Admin</NavLi>
				{/if}
				<NavLi href="/dashboard">Dashboard</NavLi>
				<Avatar id="avatar-menu" />
				<Dropdown placement="bottom" triggeredBy="#avatar-menu">
					<DropdownHeader>
						<span class="block text-sm italic text-gray-900">{fullname} </span>
						<span class="block truncate text-sm font-medium">{data.currentUser.email}</span>
					</DropdownHeader>

					<form method="POST" use:enhance action="/logout">
						<DropdownItem>
							<button type="submit">Sign out</button>
						</DropdownItem>
					</form>
				</Dropdown>
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

	<!-- <Footer footerType="logo">
		<div class="sm:flex sm:items-center sm:justify-between">
			<FooterCopyright href="/" by="Aneko" />

			<FooterLinkGroup ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0">
				<FooterLink>
					<button on:click={() => fillDrawer('Contact Us', Contact, data)}> Contact Us </button>
				</FooterLink>
				<FooterLink href="/terms">Terms & conditions</FooterLink>
				<FooterLink href="/privacy">Privacy Policy</FooterLink>
			</FooterLinkGroup>
		</div>
	</Footer> -->

	<Footer footerType="socialmedia">
		<div class="md:flex md:justify-between">
			<div class="mb-6 md:mb-0">
				<FooterBrand href="/about" src="/images/icon.png" alt="Aneko logo" name="Aneko, LTD" />
			</div>
			<div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
				<div>
					<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">About</h2>
					<FooterLinkGroup>
						<FooterLink liClass="mb-4" href="/about">Company</FooterLink>
					</FooterLinkGroup>
				</div>
				<div>
					<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
						Follow us
					</h2>
					<FooterLinkGroup>
						<FooterLink>
							<button on:click={() => fillDrawer('Contact Us', Contact, data)}> Contact Us </button>
						</FooterLink>
					</FooterLinkGroup>
				</div>
				<div>
					<h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">Legal</h2>
					<FooterLinkGroup>
						<FooterLink liClass="mb-4" href="/privacy">Privacy Policy</FooterLink>
						<FooterLink liClass="mb-4" href="/terms">Terms & Conditions</FooterLink>
					</FooterLinkGroup>
				</div>
			</div>
		</div>
		<hr class="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
		<div class="sm:flex sm:items-center sm:justify-between">
			<FooterCopyright href="/" by="Aneko" />
			<div class="mt-4 flex space-x-6 sm:mt-0 sm:justify-center rtl:space-x-reverse">
				<FooterIcon href="https://www.linkedin.com/company/104223135/" target="_blank">
					<LinkedinSolid
						class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
					/>
				</FooterIcon>
			</div>
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
