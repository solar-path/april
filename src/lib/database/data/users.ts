import { db } from '../db';
import { userTable } from '../schema/users';
import { Argon2id } from 'oslo/password';

const usersData = [
	{
		email: 'itgroup.luck@gmail.com',
		password: 'M1r@nd@32',
		activated: true,
		name: 'Ali',
		surname: 'T'
	}
];

export const seedUsers = async () => {
	const user = await db.select().from(userTable);
	if (user.length === 0) {
		console.log('start seed users');
		for (const user of usersData) {
			await db.insert(userTable).values({
				email: user.email.toLowerCase(),
				password: await new Argon2id().hash(user.password),
				id: crypto.randomUUID(),
				token: crypto.randomUUID(),
				activated: user.activated,
				name: user.name,
				surname: user.surname
			});
		}
		console.log('users seed completed');
	} else {
		console.log('users already seeded');
	}
};
