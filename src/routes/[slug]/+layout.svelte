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
		ChartPieOutline,
		InboxOutline,
		TableColumnOutline,
		UsersGroupOutline
	} from 'flowbite-svelte-icons';

	export let data;
	$: console.log('[slug]/+layout.svelte :: data => ', data);

	interface Lines {
		label: string;
		href: string;
		icon?: any;
		children?: Lines[];
	}

	const lines: Lines[] = [
		{
			label: 'Tasks',
			href: `/${$page.params.slug}/tasks`,
			icon: InboxOutline
		},
		{
			label: 'Dashboard',
			href: `/${$page.params.slug}/dashboard`,
			icon: ChartPieOutline
		},
		{
			label: 'Business structure',
			href: `/${$page.params.slug}/entity`,
			icon: BuildingOutline
		},
		{
			label: 'Users management',
			href: `/${$page.params.slug}/users`,
			icon: UsersGroupOutline,

			children: [
				{
					label: 'Users',
					href: `/${$page.params.slug}/users`
				},
				{
					label: 'Access control',
					href: `/${$page.params.slug}/rbac`
				}
			]
		},
		{
			label: 'Internal control',
			href: '',
			icon: TableColumnOutline,
			children: [
				{ label: 'Dashboard', href: `/${$page.params.slug}/IC` },
				{
					label: 'Risks',
					href: `/${$page.params.slug}/IC/risks`
				},
				{
					label: 'Controls',
					href: `/${$page.params.slug}/IC/controls`
				},
				{
					label: 'Processes',
					href: `/${$page.params.slug}/IC/processes`
				},
				{
					label: 'RCM',
					href: `/${$page.params.slug}/IC/matrix`
				}
			]
		}
	];

	$: activeUrl = $page.url.pathname;

	// $: currentWorkspace = data.currentWorkspace;
</script>

<div class="flex flex-row">
	<div class="w-1/5">
		<Sidebar class="w-full" {activeUrl}>
			<SidebarWrapper class="space-y-4 bg-white">
				<!-- <SidebarGroup>
					<Button class="w-full" outline
						>Workspace: {currentWorkspace}<ChevronDownOutline
							class="ms-2 h-6 w-6 text-white dark:text-white"
						/></Button
					>
					<Dropdown class="w-full">
						{#each data.workspaceList as workspace}
							{#if workspace.title !== currentWorkspace}
								<DropdownItem
									href={`/${workspace.slug}`}
									class="flex w-full items-center justify-start gap-2 hover:bg-primary-700 hover:text-white"
								>
									{workspace.title}
								</DropdownItem>
							{/if}
						{/each}
						<DropdownItem
							on:click={() => {
								console.log('create new workspace');
							}}
							class="flex w-full items-center justify-start gap-2 hover:bg-primary-700 hover:text-white"
						>
							<PlusOutline class="h-4 w-4" /> Create new workspace
						</DropdownItem>
					</Dropdown>
				</SidebarGroup> -->

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
