import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePdfStructureReport = async (entityList: any) => {
	const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4', compress: true });
	doc.text('Group structure report', 10, 10);
	doc.setFont('times', 'italic');
	doc.setFontSize(12);
	doc.text(`as for ${new Date().toLocaleDateString()}`, 10, 15);
	doc.setFont('times', 'normal');

	autoTable(doc, {
		head: [['#', 'Title', 'Type']],
		body: entityList.map((entity: any, index: number) => [index + 1, entity.title, entity.type]),
		startY: 25
	});
	doc.save(`${crypto.randomUUID()}.pdf`);
};
