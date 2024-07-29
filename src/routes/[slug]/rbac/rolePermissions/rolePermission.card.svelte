<script>
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import RolePermission from './rolePermission.form.svelte';

	export let data;
	$: rolePermissionList = data.rolePermissionList || [];

	const reports = [];
	const columns = [
		{ label: 'ID', key: 'id', type: 'string' },
		{ label: 'Role', key: 'role', type: 'string' },
		{ label: 'Permission', key: 'permission', type: 'string' }
	];
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
	{columns}
/>
