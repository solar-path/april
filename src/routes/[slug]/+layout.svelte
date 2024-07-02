<script lang="ts">
	import {
		Avatar,
		Button,
		Dropdown,
		DropdownItem,
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
		ChevronDownOutline,
		InboxOutline,
		PlusOutline,
		TableColumnOutline,
		UsersGroupOutline
	} from 'flowbite-svelte-icons';
	import type { LayoutData } from './$types';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import Workspace from '$lib/components/Workspace/Workspace.form.svelte';

	export let data: LayoutData;
	$: activeUrl = $page.url.pathname;

	$: lines = [
		// {
		// 	label: 'Tasks',
		// 	href: `/${$page.params.slug}/tasks`,
		// 	icon: InboxOutline
		// },

		// {
		// 	label: 'Business structure',
		// 	href: `/${$page.params.slug}/entity`,
		// 	icon: BuildingOutline
		// },
		{
			label: 'Users management',
			href: `/${$page.params.slug}/users`,
			icon: UsersGroupOutline,
			children: [
				{
					label: 'Users',
					href: `/${$page.params.slug}/users`
				}
				// {
				// 	label: 'Access control',
				// 	href: `/${$page.params.slug}/rbac`
				// }
			]
		}
		// {
		// 	label: 'Internal control',
		// 	href: '',
		// 	icon: TableColumnOutline,
		// 	children: [
		// 		{ label: 'Dashboard', href: `/${$page.params.slug}/IC` },
		// 		{
		// 			label: 'Risks',
		// 			href: `/${$page.params.slug}/IC/risks`
		// 		},
		// 		{
		// 			label: 'Controls',
		// 			href: `/${$page.params.slug}/IC/controls`
		// 		},
		// 		{
		// 			label: 'Processes',
		// 			href: `/${$page.params.slug}/IC/processes`
		// 		},
		// 		{
		// 			label: 'RCM',
		// 			href: `/${$page.params.slug}/IC/matrix`
		// 		}
		// 	]
		// }
	];
</script>

<div class="flex flex-row">
	<div class="w-1/5">
		<Sidebar class="w-full" {activeUrl}>
			<SidebarWrapper class="space-y-4 bg-white">
				<SidebarGroup>
					<Button class="flex w-full" outline>
						<div class="flex items-center justify-center gap-2">
							<p class="text-primary">Workspace:</p>
							{#if data.workspaceList.find((workspace) => workspace.slug === $page.params.slug)?.logo}
								<Avatar
									src={`/images/logo/${
										data.workspaceList.find((workspace) => workspace.slug === $page.params.slug)
											?.logo
									}`}
									size="sm"
									class="mx-auto"
								/>
							{/if}
							{data.workspaceList.find((workspace) => workspace.slug === $page.params.slug)?.title}
							<ChevronDownOutline class="ms-2 h-6 w-6 text-white dark:text-white" />
						</div>
					</Button>
					<Dropdown class="w-full">
						{#each data.workspaceList.filter((workspace) => workspace.slug !== $page.params.slug) as workspace}
							<DropdownItem
								href={`/${workspace.slug}`}
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
				</SidebarGroup>

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
	<div class="w-4/5">
		<slot />
	</div>
</div>
