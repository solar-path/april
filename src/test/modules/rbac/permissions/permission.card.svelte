<script lang="ts">
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import Permission from './permission.form.svelte';
	export let data;
	$: permissionList = data.permissionList || [];

	const reports: any[] = [];

	const columns: any[] = [
		{ label: 'ID', key: 'id', type: 'string' },
		{ label: 'Title', key: 'title', type: 'string' },
		{ label: 'Description', key: 'description', type: 'string' }
	];
</script>

<GenericTable
	tableLabel="Permission List"
	tableDescription="Browse a list of permissions"
	showToolBar={true}
	createItemLabel="New permission"
	updateItemLabel="Edit permission"
	formName={Permission}
	list={permissionList}
	deleteURL="/dashboard/rbac/permissions?/deletePermission"
	{data}
	{reports}
	{columns}
/>
