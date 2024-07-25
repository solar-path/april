import { db } from '../db';
import { workspaceTable } from '../schema/entity';
import { controlTable } from '../schema/rcm';
import { userTable } from '../schema/users';

const controlData = [
	{
		code: 'C1',
		title: 'Due diligence',
		description: 'Ensure that the supplier is reputable and meets the necessary standards.'
	},
	{
		code: 'C2',
		title: 'Inbound goods quality assurance',
		description: 'Ensure that the procured goods or services meet the required standards.'
	},
	{
		code: 'C3',
		title: 'Stock reseverse',
		description: 'Company has 3 days stock reserve.'
	},
	{
		code: 'C4',
		title: 'Price hedging',
		description: 'Company has adopted a price hedging strategy for A-category goods.'
	},
	{
		code: 'C5',
		title: 'Periodic measurement of emissions',
		description: 'Company has a periodic measurement of emissions. '
	},
	{
		code: 'C6',
		title: 'Diversification of Supply Sources',
		description:
			'Implement strategies to diversify supply sources, including identifying and qualifying alternative suppliers, to mitigate the risk of dependency on a single source of supply.'
	},
	{
		code: 'C7',
		title: 'Fraud or unethical practices in the supply chain',
		description:
			'Company has implemented counterparty due diligence and has a fraud detection system.'
	},
	{
		code: 'C8',
		title: 'Intellectual Property Rights Management',
		description:
			'Implement comprehensive intellectual property rights management practices, including thorough review of procurement contracts, to safeguard against intellectual property risks.'
	},
	{
		code: 'C9',
		title: 'SOC reports are required',
		description:
			'Company has implemented comprehensive data security measures, including encryption and secure data transmission protocols.'
	},
	{
		code: 'C10',
		title: 'Demand is analyzed versus currentstock',
		description:
			'Company has implemented a procurement management system that includes a procurement plan, a procurement strategy, and a procurement team.'
	},
	{
		code: 'C11',
		title: 'Apply CAHRA standards to supply chain',
		description:
			'Company has implemented a supply chain management system that includes a supply chain plan, a supply chain strategy, and a supply chain team.'
	},
	{
		code: 'C12',
		title: "Good's price fixed",
		description: 'Company has fixed goods cost as of Jan 1st, 2023.'
	},
	{
		code: 'C13',
		title: 'Code of conduct',
		description:
			'Suppliers are required to follow a code of conduct. Any supplier that does not follow the code of conduct will be disallowed from supplying goods or services to the company.'
	},
	{
		code: 'C14',
		title: 'Review assets lifecycle',
		description: 'Company has implemented assets lifecycle management.'
	},
	{
		code: 'C15',
		title: 'Environmental sustainability risks in the supply chain',
		description: "Company applied OECD's principles of environmental sustainability."
	}
];

/*
 *   Seeds controls into the database
 *   returns <void>
 */
export const seedControl = async () => {
	const controls = await db.select().from(controlTable);
	const user = await db.select({ id: userTable.id }).from(userTable).limit(1);
	const controlList = [];
	const workspace = await db.select({ id: workspaceTable.id }).from(workspaceTable).limit(1);

	if (controls.length === 0) {
		console.log('start seed controls');
		for (const control of controlData) {
			const newControl = await db
				.insert(controlTable)
				.values({
					id: crypto.randomUUID(),
					title: control.title,
					description: control.description,
					workspaceId: workspace[0].id,
					author: user[0].id
				})
				.returning();
			controlList.push(newControl[0]);
		}
		console.log('controls seed completed');
	} else {
		controlList.push(...controls);
		console.log('controls already seeded');
	}
};
