<script lang="ts">
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import Role from './role.form.svelte';

	export let data: any;
	$: roleList = data.roleList || [];

	const reports: any[] = [];

	console.log('rbac/roles :: data => ', data);
</script>

<GenericTable
	tableLabel="Role List"
	tableDescription="Browse a list of roles"
	showToolBar={true}
	createItemLabel="New role"
	updateItemLabel="Edit role"
	formName={Role}
	list={roleList}
	deleteURL="/dashboard/rbac/roles?/deleteRole"
	{data}
	{reports}
	columns={['id', 'title', 'description']}
/>
