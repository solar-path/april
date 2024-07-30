import { db } from '../db';
import { workspaceTable } from '../schema/entity';
import { riskTable } from '../schema/rcm';
import { userTable } from '../schema/users';

const riskData = [
	{
		title: 'Supplier default risk due to financial instability'
	},
	{
		title: 'Quality issues with procured goods or services'
	},
	{
		title: 'Delays in delivery causing project timeline slippage'
	},
	{
		title: 'Cost escalation due to fluctuating market prices'
	},
	{
		title: 'Non-compliance with regulatory or environmental standards'
	},
	{
		title: 'Dependency on a single source of supply'
	},
	{
		title: 'Fraud or unethical practices in the supply chain'
	},
	{
		title: 'Intellectual property risks in procurement contracts'
	},
	{
		title: 'Data security risks from third-party vendors'
	},
	{
		title: 'Operational inefficiencies due to complex procurement processes'
	},
	{
		title: 'Risks of supply chain disruption due to geopolitical tensions'
	},
	{
		title: 'Currency exchange rate fluctuations impacting procurement costs'
	},
	{
		title: 'Inadequate supplier due diligence leading to reputational damage'
	},
	{
		title: 'Technological obsolescence of procured equipment or systems'
	},
	{
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
	const workspace = await db.select({ id: workspaceTable.id }).from(workspaceTable).limit(1);
	if (risks.length === 0) {
		console.log('start seed risks');
		for (const risk of riskData) {
			const newRisk = await db
				.insert(riskTable)
				.values({
					id: crypto.randomUUID(),
					title: risk.title,
					workspaceId: workspace[0].id,
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
