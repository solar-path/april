import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePdfProcessReport = async (processList: any) => {
	const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4', compress: true });
	doc.text('Process report', 10, 10);
	doc.setFont('times', 'italic');
	doc.setFontSize(12);
	doc.text(`as for ${new Date().toLocaleDateString()}`, 10, 15);
	doc.setFont('times', 'normal');

	autoTable(doc, {
		head: [['#', 'Code', 'Title', 'Description']],
		body: processList.map((process: any, index: number) => [
			index + 1,
			process.code,
			process.title,
			process.description
		]),
		startY: 25
	});
	doc.save(`${crypto.randomUUID()}.pdf`);
};
