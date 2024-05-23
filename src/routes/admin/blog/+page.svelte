<script lang="ts">
	import GenericTable from '$lib/components/Table/GenericTable.svelte';
	import { generatePdfBlogReport } from './BlogReport.pdf.js';
	import { generateXlsBlogReport } from './BlogReport.xls.js';
	import PostForm from './Forms/PostForm.svelte';
	export let data;
	let postList = data.postList || [];

	const reports = [
		{
			report: generatePdfBlogReport,
			title: 'Blog Report',
			type: 'PDF'
		},
		{
			report: generateXlsBlogReport,
			title: 'Blog Report',
			type: 'XLS'
		}
	];
</script>

<GenericTable
	tableDescription="Browse a list of available posts"
	tableLabel="Blog"
	showToolBar={true}
	createItemLabel="Create Blog"
	updateItemLabel="Update Blog"
	list={postList}
	formName={PostForm}
	{reports}
	{data}
	deleteURL="/blog?/deletePost"
	columns={['id', 'title', 'status', 'readingFor']}
/>
