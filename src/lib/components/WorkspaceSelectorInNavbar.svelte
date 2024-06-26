<script lang="ts">
	import { page } from '$app/stores';
	import { Dropdown, DropdownItem, NavLi } from 'flowbite-svelte';
	import { ChevronDownOutline, PlusOutline } from 'flowbite-svelte-icons';
	import { fillDrawer } from './Drawer/drawer.utlities';
	import Workspace from '../../routes/dashboard/entity/Forms/Workspace.form.svelte';
	export let data;
</script>

{#if $page.params.slug === undefined}
	{#if data.workspaceList.length > 0}
		<NavLi class="cursor-pointer text-primary-800">
			Select Workspace
			<ChevronDownOutline class="ms-2 inline h-6 w-6 text-primary-800" />
		</NavLi>
		<Dropdown class="z-20 w-44">
			{#each data.workspaceList as workspace}
				<DropdownItem href={`/${workspace.slug}`}>{workspace.title}</DropdownItem>
			{/each}
			<DropdownItem
				on:click={() => fillDrawer('Create new workspace', Workspace, data)}
				class="flex w-full items-center gap-2"
			>
				<PlusOutline class="h-4 w-4" /> <span>New workspace</span>
			</DropdownItem>
		</Dropdown>
	{:else}
		<NavLi
			on:click={() => fillDrawer('Create new workspace', Workspace, data)}
			class="flex w-full items-center gap-2"
		>
			<PlusOutline class="h-4 w-4" /> <span>New workspace</span>
		</NavLi>
	{/if}
{:else if data.workspaceList.length > 0}
	<NavLi class="cursor-pointer text-primary-800">
		Workspace: {$page.params.slug}
		<ChevronDownOutline class="ms-2 inline h-6 w-6 text-primary-800" />
	</NavLi>
	<Dropdown class="z-20 w-44">
		{#each data.workspaceList.filter((workspace) => workspace.slug !== $page.params.slug) as workspace}
			<DropdownItem href={`/${workspace.slug}`}>{workspace.title}</DropdownItem>
		{/each}
		<DropdownItem
			on:click={() => fillDrawer('Create new workspace', Workspace, data)}
			class="flex w-full items-center gap-2"
		>
			<PlusOutline class="h-4 w-4" /> <span>New workspace</span>
		</DropdownItem>
	</Dropdown>
{:else}
	<NavLi
		on:click={() => fillDrawer('Create new workspace', Workspace, data)}
		class="flex w-full items-center gap-2"
	>
		<PlusOutline class="h-4 w-4" /> <span>New workspace</span>
	</NavLi>
{/if}
