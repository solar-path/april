<script lang="ts">
	import { page } from '$app/stores';
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import InviteUser from './InviteUser.form.svelte';
	import { generatePdfUserReport } from './reports/generatePdfUserReport';
	import { generateXlsUserReport } from './reports/generateXlsUserReport';

	export let data: any;

	$: userWorkspaceList = data.userWorkspaceList || [];
	$: console.log(userWorkspaceList);

	const reports = [
		{ report: generatePdfUserReport, title: 'User report', type: 'PDF' },
		{ report: generateXlsUserReport, title: 'User report', type: 'XLS' }
	];

	const columns = [
		{ label: 'ID', key: 'id', type: 'id' },
		{ label: 'Fullname', key: 'fullname', type: 'string' },
		{ label: 'Avatar', key: 'avatar', type: 'avatar' },
		{ label: 'Email', key: 'email', type: 'email' },
		{ label: 'Phone', key: 'phone', type: 'phone' },
		{ label: 'Activated', key: 'activated', type: 'boolean' },
		{ label: 'Joined', key: 'createdAt', type: 'date' }
	];
</script>

<GenericTable
	tableLabel="Manage users"
	tableDescription="Manage users in your workspace"
	showToolBar={true}
	createItemLabel="Invite user"
	updateItemLabel="Edit user"
	formName={InviteUser}
	list={userWorkspaceList}
	deleteURL="/{$page.params.slug}/users?/removeUserFromWorkspace"
	{data}
	{reports}
	{columns}
/>
