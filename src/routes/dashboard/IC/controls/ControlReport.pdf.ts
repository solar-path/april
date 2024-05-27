import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePdfControlReport = async (controlList: any) => {
	const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4', compress: true });
	doc.text('Process control report', 10, 10);
	doc.setFont('times', 'italic');
	doc.setFontSize(12);
	doc.text(`as for ${new Date().toLocaleDateString()}`, 10, 15);
	doc.setFont('times', 'normal');

	autoTable(doc, {
		head: [['#', 'id', 'Title', 'Description']],
		body: controlList.map((control: any, index: number) => [
			index + 1,
			control.id,
			control.title,
			control.description
		]),
		startY: 25
	});
	doc.save(`${crypto.randomUUID()}.pdf`);
};
