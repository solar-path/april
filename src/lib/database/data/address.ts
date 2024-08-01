import { db } from '../db';
import { addressTable } from '../schema/address';
import { countryTable } from '../schema/country';
import { userTable } from '../schema/users';

const addressData = [
	{
		country: 'Kazakhstan',
		city: 'Astana',
		street: 'Mangilik El, 40',
		state: 'Astana',
		zipcode: '010000',
		addressLine: 'office, 67'
	}
];

export const seedAddress = async () => {
	try {
		const addresses = await db.select().from(addressTable);
		const user = await db.select({ id: userTable.id }).from(userTable).limit(1);
		const countryList = await db.select().from(countryTable);

		if (!user.length || !countryList.length) {
			throw new Error('User or country data not found');
		}

		if (addresses.length === 0) {
			console.log('start seed addresses');
			for (const address of addressData) {
				await db.insert(addressTable).values({
					id: crypto.randomUUID(),
					city: address.city,
					state: address.state || null,
					zipcode: address.zipcode,
					countryId: countryList.find((c) => c.name === address.country)?.id,
					addressLine: address.addressLine,
					author: user[0].id
					// Consider adding: street: address.street,
				});
			}
			console.log('addresses seed completed');
		} else {
			console.log('addresses already seeded');
		}
	} catch (error) {
		console.error('Error seeding addresses:', error);
		throw error;
	}
};
