<script lang="ts">
	import TreeView from '$lib/components/Tree/TreeView.svelte';
	import { Button, ListPlaceholder } from 'flowbite-svelte';
	import UserRole from './userRole.form.svelte';
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';

	export let data: any;
	$: userRoleList = data.userRoleList || [];

	const reports: any[] = [];
</script>

<div class="mb-2 flex flex-row justify-end space-x-2">
	<Button
		on:click={() => {
			fillDrawer(`Assign Role to a user`, UserRole, data);
		}}>Add new</Button
	>
</div>

{#if userRoleList}
	<TreeView form={null} tree={userRoleList} option="select" route="" />
{:else}
	<ListPlaceholder />
{/if}

<!-- 
<GenericTable
	tableLabel="User Role List"
	tableDescription="Browse a list of user roles"
	showToolBar={true}
	createItemLabel="New user role"
	updateItemLabel="Edit user role"
	formName={UserRole}
	list={userRoleList}
	deleteURL="/dashboard/rbac/userRoles?/deleteUserRole"
	{data}
	{reports}
	columns={['id', 'userId', 'roleId']}
/> -->
