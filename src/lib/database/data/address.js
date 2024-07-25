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
	const addressList = [];
	const addresses = await db.select().from(addressTable);
	const user = await db.select({ id: userTable.id }).from(userTable).limit(1);
	const countryList = await db.select().from(countryTable);
	if (addresses.length === 0) {
		console.log('start seed addresses');
		for (const address of addressData) {
			const newAddress = await db
				.insert(addressTable)
				.values({
					id: crypto.randomUUID(),
					city: address.city,
					state: address.state ?? '',
					zipcode: address.zipcode ?? '',
					countryId: countryList.find((c) => c.name === address.country)?.id,
					addressLine: address.addressLine,
					author: user[0].id
				})
				.returning();
			addressList.push(newAddress[0]);
		}
		console.log('addresses seed completed');
	} else {
		addressList.push(...addresses);
		console.log('addresses already seeded');
	}

	return addressList;
};
