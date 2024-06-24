<script lang="ts">
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import UserRole from './userRole.form.svelte';

	export let data: any;
	$: userRoleList = data.userRoleList || [];

	const reports: any[] = [];
</script>

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
/>
