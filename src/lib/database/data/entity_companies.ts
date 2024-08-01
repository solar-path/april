import { slugify } from '$lib/helpers/slugify';
import { db } from '../db';
import { addressTable } from '../schema/address';
import { companyTable, workspaceTable } from '../schema/entity';
import { industryTable } from '../schema/industry';
import { userTable } from '../schema/users';

const companyData = [
	{
		title: 'Aneko',
		type: 'company',
		workspace: 'Aneko Management Group',
		industry: 'Application Software',
		BIN: '1234567890'
	}
];

export const seedCompany = async () => {
	const companyList = [];
	const companies = await db.select().from(companyTable);

	const workspaceList = await db.select().from(workspaceTable).limit(1);
	const industryList = await db.select().from(industryTable);
	const addressList = await db.select().from(addressTable).limit(1);
	const user = await db.select().from(userTable).limit(1);

	if (companies.length === 0) {
		console.log('start seed companies');
		for (const company of companyData) {
			const newCompany = await db
				.insert(companyTable)
				.values({
					id: crypto.randomUUID(),
					title: company.title,
					logo: '',
					company: await slugify(
						company.title.trim().toLowerCase(),
						companyTable,
						companyTable.company
					),
					workspaceId: workspaceList[0].id,
					industryId: industryList.find((i) => i.name === company.industry)?.id,
					BIN: company.BIN,
					address: addressList[0].id,
					author: user[0].id
				})
				.returning();
			companyList.push(newCompany[0]);
		}
		console.log('companies seed completed');
	} else {
		companyList.push(...companies);
		console.log('companies already seeded');
	}

	return companyList;
};
