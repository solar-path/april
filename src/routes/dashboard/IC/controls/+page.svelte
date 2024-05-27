<script lang="ts">
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import Control from '../controls/Control.form.svelte';
	import { generatePdfControlReport } from './ControlReport.pdf';
	import { generateXlsControlReport } from './controlReport.xls';

	export let data: any;
	let controlList = data.controlList || [];

	const reports = [
		{
			report: generatePdfControlReport,
			title: 'Control Report',
			type: 'PDF'
		},
		{
			report: generateXlsControlReport,
			title: 'Control Report',
			type: 'XLS'
		}
	];
</script>

<GenericTable
	tableLabel="Process controls"
	tableDescription="Browse a list of emplemented controls that prevents and/or detects risks."
	showToolBar={true}
	createItemLabel="New control"
	updateItemLabel="Edit control"
	formName={Control}
	list={controlList}
	deleteURL="/dashboard/IC?/deleteControl"
	{data}
	{reports}
	columns={['id', 'title', 'description']}
/>
