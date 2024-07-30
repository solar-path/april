<script>
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import Matrix from './Matrix.form.svelte';
	import { generatePdfMatrixReport } from './MatrixReport.pdf';
	import { generateXlsMatrixReport } from './matrixReport.xls';

	export let data;

	$: matrixList = data.matrixList || [];

	const reports = [
		{ report: generatePdfMatrixReport, label: 'Matrix Report', type: 'PDF' },
		{ report: generateXlsMatrixReport, label: 'Matrix Report', type: 'XLS' }
	];

	const columns = [
		{ label: 'Company', key: 'company', type: 'text' },
		{ label: 'Process', key: 'process', type: 'text' },
		{ label: 'Risk', key: 'risk', type: 'text' },
		{ label: 'Control', key: 'control', type: 'text' },
		{ label: 'Frequency', key: 'frequency', type: 'text' },
		{ label: 'Type', key: 'type', type: 'text' },
		{ label: 'Execution', key: 'execution', type: 'text' },
		{ label: 'Control Owner', key: 'controlOwner', type: 'text' }
	];
</script>

<GenericTable
	tableLabel="Risk and control matrix"
	tableDescription="Browse a list of risk and control matrix."
	showToolBar={true}
	createItemLabel="New matrix"
	updateItemLabel="Edit matrix"
	formName={Matrix}
	list={matrixList}
	deleteURL="/dashboard/IC/matrix?/deleteMatrix"
	{data}
	{reports}
	{columns}
/>
