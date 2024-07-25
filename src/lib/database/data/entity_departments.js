import { db } from '../db';
import { companyTable, departmentTable } from '../schema/entity';
import { userTable } from '../schema/users';

const departmentData = [
	{ title: 'Management' },
	{ title: 'Accounting' },
	{ title: 'Legal' },
	{ title: 'Finance reporting' },
	{ title: 'Human resource management' },
	{ title: 'Development' }
];

export const seedDepartment = async () => {
	const departmentList = [];
	const departments = await db.select().from(departmentTable);
	const companyList = await db.select().from(companyTable);
	const user = await db.select().from(userTable);

	if (departments.length === 0) {
		console.log('start seed departments');
		for (const department of departmentData) {
			const newDepartment = await db
				.insert(departmentTable)
				.values({
					id: crypto.randomUUID(),
					title: department.title,
					companyId: companyList[0].id,
					author: user[0].id
				})
				.returning();
			departmentList.push(newDepartment[0]);
		}
		console.log('departments seed completed');
	} else {
		departmentList.push(...departments);
		console.log('departments already seeded');
	}

	return departmentData;
};
