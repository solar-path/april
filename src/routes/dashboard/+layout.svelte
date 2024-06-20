<script>
	import {
		Sidebar,
		SidebarDropdownItem,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';

	import { page } from '$app/stores';
	import PathFinder from '$lib/components/Breadcrumb/PathFinder.svelte';

	const modules = [
		{
			label: 'Tasks',
			href: '/dashboard/tasks'
		},
		{
			label: 'Dashboard',
			href: '/dashboard'
		},
		{
			label: 'Business structure',
			href: '/dashboard/entity'
		},
		{
			label: 'User management',
			children: [
				{
					label: 'Access control',
					href: '/dashboard/rbac'
				},
				{
					label: 'Users',
					href: '/dashboard/users'
				}
			]
		},

		{
			label: 'Internal control',
			href: '/dashboard/IC',
			children: [
				{
					label: 'Risks',
					href: '/dashboard/IC/risks'
				},
				{
					label: 'Controls',
					href: '/dashboard/IC/controls'
				},
				{
					label: 'Processes',
					href: '/dashboard/IC/processes'
				},
				{
					label: 'RCM',
					href: '/dashboard/IC/matrix'
				}
			]
		}
	];
</script>

<div class="flex flex-row">
	<div class="w-1/5">
		<Sidebar class="w-full">
			<SidebarWrapper class="bg-white">
				<SidebarGroup>
					{#each modules as module}
						<SidebarItem
							class="hover:bg-red-700 hover:text-white"
							label={module.label}
							href={module.href}
						/>
						{#if module.children}
							{#each module.children as child}
								<SidebarDropdownItem label={child.label} href={child.href} />
							{/each}
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
