import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generate a PDF report
 * @param {any} data - The data to be displayed in the report
 * @param {string} reportTitle - The title of the report
 * @param {string[]} headers - The headers of the report
 */
export const generatePdfReport = (data: any, reportTitle: string, headers: string[]) => {
	const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4', compress: true });
	doc.text(reportTitle, 10, 10);
	doc.setFont('times', 'italic');
	doc.setFontSize(12);
	doc.text(`as for ${new Date().toLocaleDateString()}`, 10, 15);
	doc.setFont('times', 'normal');

	const columns = ['index', 'id', 'title'];

	autoTable(doc, {
		head: [headers],
		body: data.map((item: any, index: number) =>
			columns.map((col) => (col === 'index' ? index + 1 : item[col]))
		),
		startY: 25
	});
	doc.save(`${crypto.randomUUID()}.pdf`);
};
