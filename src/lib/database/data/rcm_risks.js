import { db } from '../db';
import { riskTable } from '../schema/rcm';
import { userTable } from '../schema/users';

const riskData = [
	{
		code: 'R1',
		title: 'Supplier default risk due to financial instability'
	},
	{
		code: 'R2',
		title: 'Quality issues with procured goods or services'
	},
	{
		code: 'R3',
		title: 'Delays in delivery causing project timeline slippage'
	},
	{
		code: 'R4',
		title: 'Cost escalation due to fluctuating market prices'
	},
	{
		code: 'R5',
		title: 'Non-compliance with regulatory or environmental standards'
	},
	{
		code: 'R6',
		title: 'Dependency on a single source of supply'
	},
	{
		code: 'R7',
		title: 'Fraud or unethical practices in the supply chain'
	},
	{
		code: 'R8',
		title: 'Intellectual property risks in procurement contracts'
	},
	{
		code: 'R9',
		title: 'Data security risks from third-party vendors'
	},
	{
		code: 'R10',
		title: 'Operational inefficiencies due to complex procurement processes'
	},
	{
		code: 'R11',
		title: 'Risks of supply chain disruption due to geopolitical tensions'
	},
	{
		code: 'R12',
		title: 'Currency exchange rate fluctuations impacting procurement costs'
	},
	{
		code: 'R13',
		title: 'Inadequate supplier due diligence leading to reputational damage'
	},
	{
		code: 'R14',
		title: 'Technological obsolescence of procured equipment or systems'
	},
	{
		code: 'R15',
		title: 'Environmental sustainability risks in the supply chain'
	}
];

/*
 *   Seeds risks into the database
 *   returns <void>
 */
export const seedRisk = async () => {
	const riskList = [];
	const risks = await db.select().from(riskTable);
	const user = await db.select({ id: userTable.id }).from(userTable).limit(1);

	if (risks.length === 0) {
		console.log('start seed risks');
		for (const risk of riskData) {
			const newRisk = await db
				.insert(riskTable)
				.values({
					id: crypto.randomUUID(),
					title: risk.title,
					author: user[0].id
				})
				.returning();
			riskList.push(newRisk[0].id);
		}
		console.log('risks seed completed');
	} else {
		riskList.push(...risks);
		console.log('risks already seeded');
	}
};
