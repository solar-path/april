<script>
	import { Avatar, Dropdown, DropdownItem, NavLi } from 'flowbite-svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import Workspace from '$lib/components/Workspace/Workspace.form.svelte';

	export let data;
	export let currentWorkspace;
	$: workspaceList = data.workspaceList;
	$: companyList = data.companyList;
</script>

<!-- Workspace -->
<NavLi>
	<button id="selectWorkspace" class="flex items-center justify-center gap-2 text-primary-700">
		<p>Workspace:</p>
		{#if workspaceList.find((workspace) => workspace.workspace === currentWorkspace)?.logo}
			<Avatar
				src={`/images/logo/${
					workspaceList.find((workspace) => workspace.workspace === currentWorkspace)?.logo
				}`}
				size="sm"
				class="mx-auto"
			/>
		{/if}
		{workspaceList.find((workspace) => workspace.workspace === currentWorkspace)?.title ||
			'Select one'}
	</button>

	<Dropdown class="w-full" triggeredBy="#selectWorkspace">
		{#each workspaceList.filter((workspace) => workspace.workspace !== currentWorkspace) as workspace}
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
	<button>
		<p>Company:</p>
	</button>
</NavLi>
