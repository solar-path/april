import * as XLSX from 'xlsx';

export const generateXlsStructureReport = async (entityList: any) => {
	const wb = XLSX.utils.book_new();
	const wsName = 'Entity Report';
	const wsData = [
		['Entity report', `as per ${new Date().toLocaleDateString()}`],
		[],
		['Title', 'Type']
	];
	entityList.forEach((item: { title: string; type: string }) => {
		wsData.push([item.title, item.type]);
	});
	const ws = XLSX.utils.aoa_to_sheet(wsData);
	XLSX.utils.book_append_sheet(wb, ws, wsName);
	XLSX.writeFile(wb, `${crypto.randomUUID()}.xlsx`);
};
