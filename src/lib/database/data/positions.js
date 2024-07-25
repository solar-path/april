import { db } from '../db';
import { companyTable, departmentTable, positionTable } from '../schema/entity';
import { userTable } from '../schema/users';

export const positionData = [
	{ title: 'Chief Executive Officer', department: 'Management', company: 'Aneko' },
	{ title: 'Chief Financial Officer', department: 'Management', company: 'Aneko' },
	{ title: 'Chief Accountant', department: 'Accounting', company: 'Aneko' },
	{ title: 'Accounting Manager', department: 'Accounting', company: 'Aneko' },
	{ title: 'Chief Legal Officer', department: 'Legal', company: 'Aneko' },
	{ title: 'Legal Assistant', department: 'Legal', company: 'Aneko' },
	{
		title: 'Chief Human Resource Officer',
		department: 'Human resource management',
		company: 'Aneko'
	},
	{
		title: 'Human Resource Manager',
		department: 'Human resource management',
		company: 'Aneko'
	},
	{
		title: 'Chief Information Technology Officer',
		department: 'Development',
		company: 'Aneko'
	},
	{ title: 'Senior Developer', department: 'Development', company: 'Aneko' },
	{ title: 'Junior Developer', department: 'Development', company: 'Aneko' },
	{ title: 'Tester', department: 'Development', company: 'Aneko' },
	{ title: 'Information Security Manager', department: 'Development', company: 'Aneko' }
];

export const seedPosition = async () => {
	const positionList = [];
	const positions = await db.select().from(positionTable);
	const departmentList = await db.select().from(departmentTable);
	const companyList = await db.select().from(companyTable);
	const user = await db.select().from(userTable);

	if (positions.length === 0) {
		console.log('start seed positions');
		for (const position of positionData) {
			const newPosition = await db
				.insert(positionTable)
				.values({
					id: crypto.randomUUID(),
					title: position.title,
					departmentId: departmentList.find((d) => d.title === position.department)?.id,
					companyId: companyList.find((c) => c.title === position.company)?.id,
					author: user[0].id
				})
				.returning();
			positionList.push(newPosition[0]);
		}
		console.log('positions seed completed');
	} else {
		positionList.push(...positions);
		console.log('positions already seeded');
	}
	return positionList;
};
