<script lang="ts">
	import Risk from '../risks/Risk.form.svelte';
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import { generatePdfRiskReport } from './RiskReport.pdf';
	import { generateXlsRiskReport } from './riskReport.xls';

	export let data;

	$: riskList = data.riskList || [];

	const reports = [
		{ report: generatePdfRiskReport, title: 'Risk Report', type: 'PDF' },
		{ report: generateXlsRiskReport, title: 'Risk Report', type: 'XLS' }
	];

	const columns = [{ label: 'Title', key: 'title', type: 'text' }];
</script>

<GenericTable
	tableLabel="Risk List"
	tableDescription="Browse a list of risks that might adversly affect company's ability to achieve process
	objectives."
	showToolBar={true}
	createItemLabel="New risk"
	updateItemLabel="Edit risk"
	formName={Risk}
	list={riskList}
	deleteURL="/dashboard/IC/risks?/deleteRisk"
	{data}
	{reports}
	{columns}
/>
