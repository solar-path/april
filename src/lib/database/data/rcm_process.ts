import { db } from '../db';
import { workspaceTable } from '../schema/entity';
import { processTable } from '../schema/rcm';
import { userTable } from '../schema/users';

const processData = [
	{
		title: 'Procure to pay',
		description:
			'Procure to pay is a process whereby a company purchases goods or services from suppliers.',
		code: 'PTP',
		parent: null
	},
	{
		title: 'Procurement',
		description: '',
		code: 'PTP#1',
		parent: 'Procure to pay'
	},
	{
		title: 'Supplier Selection and Management',
		code: 'PTP#1',
		description:
			"Purchases must be made from an approved supplier database/list in accordance with local procedures. A formal process should be in place to approve purchases from suppliers not on the approved database or on a government watch-list such as the Office of Foreign Assets (OFAC) and the Office of Inspector General (OIG). Suppliers need to be screened to ensure that foreign officials and politically exposed persons (PEPs) are not included on the supplier master file and the Foreign Corrupt Practices Act (FCPA) is not violated. Noncompliance with any of these screening processes noted could result in significant fines and damage to the company's reputation.",
		parent: 'Procurement'
	},
	{
		title: 'Demand identification',
		code: 'PTP#1',
		description: '',
		parent: 'Supplier Selection and Management'
	},
	{
		title: 'Selecting supplier',
		code: 'PTP#1',
		description: '',
		parent: 'Supplier Selection and Management'
	},
	{
		title: 'Request for quotation',
		code: 'PTP#1',
		description: '',
		parent: 'Selecting supplier'
	},
	{
		title: 'Request for proposal',
		code: 'PTP#1',
		description: '',
		parent: 'Selecting supplier'
	},
	{
		title: 'Single source procurement',
		code: 'PTP#1',
		description: '',
		parent: 'Selecting supplier'
	},
	{
		title: 'Direct negotiation',
		code: 'PTP#1',
		description: '',
		parent: 'Selecting supplier'
	},
	{
		title: 'Contract Management',
		code: 'PTP#1',
		description: '',
		parent: 'Procurement'
	},
	{
		title: 'Terms & Conditions',
		code: 'PTP#1',
		description: '',
		parent: 'Contract Management'
	},
	{
		title: 'Contract',
		code: 'PTP#1',
		description: '',
		parent: 'Contract Management'
	},
	{
		title: 'Purchasing and Ordering',
		code: 'PTP#1',
		description:
			'To reduce company and supplier risk for the purchasing and ordering process, all ordering responsibilities must be segregated from accounts payable/payment, receiving, and accounting activities. Responsibilities should be clearly defined and system access is validated on a regular basis.',
		parent: 'Procurement'
	},
	{
		title: 'Requisitions',
		code: 'PTP#1',
		description: '',
		parent: 'Purchasing and Ordering'
	},
	{
		title: 'Purchase Orders',
		code: 'PTP#1',
		description: '',
		parent: 'Purchasing and Ordering'
	},
	{
		title: 'Receiving',
		code: 'PTP#1',
		description:
			'To ensure proper segregation of duties, the receiving department should be physically segregated from the production facilities and shipping. As a key component of the procure to pay (P2P) process, receiving is responsible for the recording of all company receipts. The accurate receipt of good and services drives the three-way matching process in which the purchase order (PO), invoice, and receiving document are validated for the correct pricing, quan- tities, and price.',
		parent: 'Procure to pay'
	},
	{
		title: 'Goods and service receiving',
		code: 'PTP#1',
		description: 'Receiving',
		parent: 'Receiving'
	},
	{
		title: 'Goods and services acceptance',
		code: 'PTP#1',
		description: '',
		parent: 'Goods and service receiving'
	},
	{
		title: 'Receipt Is Processed',
		code: 'PTP#1',
		description: '',
		parent: 'Goods and service receiving'
	},
	{
		title: 'Accounts Payable',
		code: 'PTP#1',
		description:
			"The AP process or function is immensely important since it involves nearly all of a company's payments outside of payroll. Regardless of the company's size, the mission of AP is to pay only the company's bills and invoices that are legit- imate and accurate. This means that before a supplier's invoice is entered into the accounting records and scheduled for payment, the invoice must reflect:",
		parent: 'Procure to pay'
	}
];

export const seedProcess = async () => {
	const processList = [];
	const processes = await db.select().from(processTable);
	const user = await db.select({ id: userTable.id }).from(userTable).limit(1);
	const workspace = await db.select({ id: workspaceTable.id }).from(workspaceTable).limit(1);

	if (processes.length === 0) {
		console.log('start seed processes');
		for (const process of processData) {
			const newProcess = await db
				.insert(processTable)
				.values({
					id: crypto.randomUUID(),
					title: process.title,
					description: process.description,
					author: user[0].id,
					workspaceId: workspace[0].id,
					parentId:
						process.parent === null ? null : processList.find((p) => p.title === process.parent)?.id // This will be null for top-level posts
				})
				.returning();

			processList.push(newProcess[0]);
		}
		console.log('processes seed completed');
	} else {
		processList.push(...processes);
		console.log('processes already seeded');
	}
};
