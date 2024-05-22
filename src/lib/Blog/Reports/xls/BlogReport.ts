import * as XLSX from 'xlsx';

export const generateXlsBlogReport = async (postList: any) => {
	const wb = XLSX.utils.book_new();
	const wsName = 'Posts Report';
	const wsData = [
		['PostControl report', `as per ${new Date().toLocaleDateString()}`],
		[],
		['id', 'title', 'status', 'readingFor']
	];
	postList.forEach((item: { id: string; title: string; status: string; readingFor: string }) => {
		wsData.push([item.id, item.title, item.status, item.readingFor]);
	});
	const ws = XLSX.utils.aoa_to_sheet(wsData);
	XLSX.utils.book_append_sheet(wb, ws, wsName);
	XLSX.writeFile(wb, `${crypto.randomUUID()}.xlsx`);
};
