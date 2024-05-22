import * as XLSX from 'xlsx';

export const generateXlsRiskReport = async (riskList: any) => {
	const wb = XLSX.utils.book_new();
	const wsName = 'Risk Report';
	const wsData = [
		['Risk report', `as per ${new Date().toLocaleDateString()}`],
		[],
		['Code', 'Title']
	];
	riskList.forEach((risk: { code: string; title: string }) => {
		wsData.push([risk.code, risk.title]);
	});
	const ws = XLSX.utils.aoa_to_sheet(wsData);
	XLSX.utils.book_append_sheet(wb, ws, wsName);
	XLSX.writeFile(wb, `${crypto.randomUUID()}.xlsx`);
};
