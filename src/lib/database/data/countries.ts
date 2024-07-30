import { db } from '../db';
import { countryTable } from '../schema/country';
import countryData from './countries.json';

export const seedCountry = async () => {
	const countryList = [];
	const countries = await db.select().from(countryTable);
	if (countries.length === 0) {
		console.log('start seed countries');
		for (const country of countryData) {
			const newCountry = await db
				.insert(countryTable)
				.values({
					id: crypto.randomUUID(),
					name: country.name,
					iso3: country.iso3,
					phone_code: country.phone_code,
					currency: country.currency,
					currency_name: country.currency_name,
					currency_symbol: country.currency_symbol,
					tld: country.tld,
					region: country.region,
					subregion: country.subregion,
					emoji: country.emoji
				})
				.returning();
			countryList.push(newCountry[0]);
		}
		console.log('countries seed completed');
	} else {
		countryList.push(...countries);
		console.log('countries already seeded');
	}

	return countryList;
};
