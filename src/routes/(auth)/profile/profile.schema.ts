import { z } from 'zod';

export const profileSchema = z.object({
	name: z.string().min(1, { message: 'Field cannot be blank' }),
	surname: z.string().min(1, { message: 'Field cannot be blank' }),
	gender: z.string().nullable(),
	dob: z.string().nullable(),
	avatar: z
		.instanceof(File, { message: 'Please upload a valid file.' })
		.refine((f) => f.size < 500_000, 'Max 500 kB upload size.')
		.nullable(),
	phone: z.string().nullable(),
	addressLine: z.string().nullable(),
	zipcode: z.string().nullable(),
	state: z.string().nullable(),
	country: z.string().nullable(),
	city: z.string().nullable(),
	idNumber: z.string().min(1, { message: 'Field cannot be blank' })
});
