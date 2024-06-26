<script lang="ts">
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import InviteUser from './InviteUser.form.svelte';
	import { generatePdfUserReport } from './reports/generatePdfUserReport';
	import { generateXlsUserReport } from './reports/generateXlsUserReport';

	export let data: any;

	$: userList = data.userList || [];

	const reports = [
		{ report: generatePdfUserReport, title: 'User report', type: 'PDF' },
		{ report: generateXlsUserReport, title: 'User report', type: 'XLS' }
	];
</script>

<GenericTable
	tableLabel="Manage users"
	tableDescription="Manage users in your workspace"
	showToolBar={true}
	createItemLabel="Invite user"
	updateItemLabel="Edit user"
	formName={InviteUser}
	list={userList}
	deleteURL="/dashboard/users?/deleteUser"
	{data}
	{reports}
	columns={['id', 'email', 'name', 'surname', 'createdAt']}
/>
