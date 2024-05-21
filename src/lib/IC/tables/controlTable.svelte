<script lang="ts">
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import Control from '$lib/IC/forms/Control.svelte';
	import { generatePdfControlReport } from '../Reports/pdf/ControlReport';

	import { generateXlsControlReport } from '../Reports/xls/controlReport';

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
	tableDescription="	Browse a list of emplemented controls that prevents and/or detects risks."
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
