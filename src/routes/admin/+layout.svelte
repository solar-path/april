<script>
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

	const modules = [
		{
			label: 'Posts',
			href: '/admin/blog'
		},

		{
			label: 'Users',
			href: '/admin/users'
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
					{/each}
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</div>
	<div class="w-4/5">
		<slot />
	</div>
</div>
