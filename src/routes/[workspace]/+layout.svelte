<script lang="ts">
	import {
		Sidebar,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';

	import { page } from '$app/stores';
	import {
		BuildingOutline,
		InboxOutline,
		TableColumnOutline,
		UsersGroupOutline
	} from 'flowbite-svelte-icons';

	$: activeUrl = $page.url.pathname;

	$: lines = [
		{
			label: 'Tasks',
			href: `/${$page.params.workspace}/tasks`,
			icon: InboxOutline
		},

		{
			label: 'Business structure',
			href: `/${$page.params.workspace}/entity`,
			icon: BuildingOutline
		},
		{
			label: 'Users management',
			href: `/${$page.params.workspace}/users`,
			icon: UsersGroupOutline,
			children: [
				{
					label: 'Users',
					href: `/${$page.params.workspace}/users`
				},
				{
					label: 'Access control',
					href: `/${$page.params.workspace}/rbac`
				}
			]
		},
		{
			label: 'Internal control',
			href: '',
			icon: TableColumnOutline,
			children: [
				{ label: 'Dashboard', href: `/${$page.params.workspace}/IC` },
				{
					label: 'Risks',
					href: `/${$page.params.workspace}/IC/risks`
				},
				{
					label: 'Controls',
					href: `/${$page.params.workspace}/IC/controls`
				},
				{
					label: 'Business processes',
					href: `/${$page.params.workspace}/IC/processes`
				},
				{
					label: 'Risk & Control Matrix',
					href: `/${$page.params.workspace}/IC/matrix`
				}
			]
		}
	];
</script>

<div class="flex flex-row">
	<div class="w-1/5">
		<Sidebar class="w-full" {activeUrl}>
			<SidebarWrapper class="space-y-4 bg-white">
				<SidebarGroup>
					{#each lines as item}
						{#if item.children && item.children.length > 0}
							<SidebarDropdownWrapper label={item.label} class="hover:bg-red-700 hover:text-white">
								<svelte:fragment slot="icon">
									<svelte:component
										this={item.icon}
										class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-white"
									/>
								</svelte:fragment>
								{#each item.children as child}
									<SidebarDropdownItem
										label={child.label}
										href={child.href}
										class="hover:bg-red-700 hover:text-white"
									/>
								{/each}
							</SidebarDropdownWrapper>
						{:else}
							<SidebarItem
								class="hover:bg-red-700 hover:text-white"
								label={item.label}
								href={item.href}
							>
								<svelte:fragment slot="icon">
									<svelte:component
										this={item.icon}
										class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-white"
									/>
								</svelte:fragment>
							</SidebarItem>
						{/if}
					{/each}
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</div>
	<div class="mt-4 w-4/5">
		<slot />
	</div>
</div>
