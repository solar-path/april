import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePdfRiskReport = async (riskList: any) => {
	const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4', compress: true });
	doc.text('Process risk report', 10, 10);
	doc.setFont('times', 'italic');
	doc.setFontSize(12);
	doc.text(`as for ${new Date().toLocaleDateString()}`, 10, 15);
	doc.setFont('times', 'normal');

	autoTable(doc, {
		head: [['#', 'Code', 'Title']],
		body: riskList.map((risk: any, index: number) => [index + 1, risk.id, risk.title]),
		startY: 25
	});
	doc.save(`${crypto.randomUUID()}.pdf`);
};
