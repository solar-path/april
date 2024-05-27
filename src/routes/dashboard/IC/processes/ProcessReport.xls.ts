import * as XLSX from 'xlsx';

export const generateXlsProcessReport = async (processList: any) => {
	const wb = XLSX.utils.book_new();
	const wsName = 'Process Report';
	const wsData = [
		['Process report', `as per ${new Date().toLocaleDateString()}`],
		[],
		['Code', 'Title', 'Description']
	];
	processList.forEach((item: { code: string; title: string; description: string }) => {
		wsData.push([item.code, item.title, item.description]);
	});
	const ws = XLSX.utils.aoa_to_sheet(wsData);
	XLSX.utils.book_append_sheet(wb, ws, wsName);
	XLSX.writeFile(wb, `${crypto.randomUUID()}.xlsx`);
};
