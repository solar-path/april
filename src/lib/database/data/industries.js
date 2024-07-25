import { db } from '../db';
import { industryTable } from '../schema/industry';
import industryData from './industries.json';
/*
 *   Seeds industries into the database
 *   returns <void>
 */
export const seedIndustry = async () => {
	const industryList = [];
	const industries = await db.select().from(industryTable);
	if (industries.length === 0) {
		console.log('start seed industries');
		for (const industry of industryData) {
			const newIndustry = await db
				.insert(industryTable)
				.values({
					id: industry.code,
					name: industry.name,
					description: industry.description,
					parentId: industry.parentId
				})
				.returning();
			industryList.push(newIndustry[0]);
		}
		console.log('industries seed completed');
	} else {
		industryList.push(...industries);
		console.log('industries already seeded');
	}
};
