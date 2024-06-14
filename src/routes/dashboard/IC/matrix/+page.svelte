<script lang="ts">
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import Matrix from './Matrix.form.svelte';
	import { generatePdfMatrixReport } from './MatrixReport.pdf';
	import { generateXlsMatrixReport } from './matrixReport.xls';

	export let data: any;

	$: matrixList = data.matrixList || [];

	const reports = [
		{ report: generatePdfMatrixReport, label: 'Matrix Report', type: 'PDF' },
		{ report: generateXlsMatrixReport, label: 'Matrix Report', type: 'XLS' }
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
	columns={[
		'company',
		'process',
		'risk',
		'control',
		'frequency',
		'type',
		'execution',
		'controlOwner'
	]}
/>
