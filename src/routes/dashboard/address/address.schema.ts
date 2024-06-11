import { z } from 'zod';
import { countryTable } from '$lib/database/schema/country';
import { db } from '$lib/database/db';

const countries = await db.select().from(countryTable);

export const addressSchema = z.object({
	countryId: z.string(),
	country: z
		.string()
		.min(1, { message: 'Required field' })
		.refine(
			(value) => {
				const validItems = countries.map((unit) => unit.name.toLowerCase());
				return value ? validItems.includes(value.toLowerCase()) : true;
			},
			{ message: 'Invalid country' }
		),
	// 	Address
	city: z.string().min(1, { message: 'Required field' }),
	state: z.string().min(1, { message: 'Required field' }),
	zipcode: z.string().min(1, { message: 'Required field' }),
	addressLine: z.string().min(1, { message: 'Required field' })
});

export const deleteAddressSchema = z.object({
	id: z.string()
});
