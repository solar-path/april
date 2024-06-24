<script lang="ts">
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import Permission from './permission.form.svelte';
	export let data: any;
	$: permissionList = data.permissionList || [];

	const reports: any[] = [];
</script>

<GenericTable
	tableLabel="Permission List"
	tableDescription="Browse a list of permissions"
	showToolBar={true}
	createItemLabel="New permission"
	updateItemLabel="Edit permission"
	formName={Permission}
	list={permissionList}
	deleteURL="/dashboard/IC/risks?/deleteRisk"
	{data}
	{reports}
	columns={['id', 'title', 'description']}
/>
