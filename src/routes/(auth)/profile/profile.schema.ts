import { z } from 'zod';

export const profileSchema = z.object({
	name: z.string().min(1, { message: 'Field cannot be blank' }),
	surname: z.string().min(1, { message: 'Field cannot be blank' }),
	gender: z.string().optional(),
	dob: z.string().optional(),
	avatar: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 1_000_000, 'Max 1 MB upload size.')
		.nullable(),
	phone: z.string().optional(),
	addressLine: z.string().optional(),
	zipcode: z.string().optional(),
	state: z.string().nullable(),
	country: z.string().optional(),
	city: z.string().optional(),
	idNumber: z.string().min(1, { message: 'Field cannot be blank' })
});
