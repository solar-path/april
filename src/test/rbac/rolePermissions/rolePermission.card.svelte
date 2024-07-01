<script lang="ts">
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import RolePermission from './rolePermission.form.svelte';

	export let data: any;
	$: rolePermissionList = data.rolePermissionList || [];

	const reports: any[] = [];
</script>

<GenericTable
	tableLabel="Role Permission List"
	tableDescription="Browse a list of role permissions"
	showToolBar={true}
	createItemLabel="New role permission"
	updateItemLabel="Edit role permission"
	formName={RolePermission}
	list={rolePermissionList}
	deleteURL="/dashboard/rbac/rolePermissions?/deleteRolePermission"
	{data}
	{reports}
	columns={['id', 'role', 'permission']}
/>
