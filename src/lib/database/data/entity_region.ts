import { db } from '../db';
import { regionTable } from '../schema/entity';
import { userTable } from '../schema/users';
import { workspaceTable } from '../schema/entity';

const regionData = [
	{
		title: 'Asia'
	}
];

export const seedRegion = async () => {
	const regionList = [];
	const user = await db.select({ id: userTable.id }).from(userTable).limit(1);
	const workspace = await db.select({ id: workspaceTable.id }).from(workspaceTable).limit(1);
	const regions = await db.select().from(regionTable);
	if (regions.length === 0) {
		console.log('start seed regions');
		for (const region of regionData) {
			const newRegion = await db
				.insert(regionTable)
				.values({
					id: crypto.randomUUID(),
					title: region.title,
					workspaceId: workspace[0].id,
					author: user[0].id
				})
				.returning();
			regionList.push(newRegion[0]);
		}
		console.log('regions seed completed');
	} else {
		regionList.push(...regions);
		console.log('regions already seeded');
	}
};
