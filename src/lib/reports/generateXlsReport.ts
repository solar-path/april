import * as XLSX from 'xlsx';

/**
 * Generate an Excel report
 * @param {any[]} data - The data to be displayed in the report
 * @param {string} reportTitle - The title of the report
 * @param {string[]} headers - The headers of the report
 * @param {string[]} itemKeys - The keys of the data to be displayed in the report
 */
export const generateXlsRiskReport = async (
	data: any[],
	reportTitle: string,
	headers: string[],
	itemKeys: string[]
) => {
	const wb = XLSX.utils.book_new();
	const wsName = reportTitle;
	const wsData = [[reportTitle, `as per ${new Date().toLocaleDateString()}`], [], headers];

	data.forEach((item: any) => {
		wsData.push(itemKeys.map((key) => item[key]));
	});

	const ws = XLSX.utils.aoa_to_sheet(wsData);
	XLSX.utils.book_append_sheet(wb, ws, wsName);
	XLSX.writeFile(wb, `${crypto.randomUUID()}.xlsx`);
};
