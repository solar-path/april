import { z } from 'zod';

// Name has a default value just to display something in the form.
export const contactUsSchema = z.object({
	email: z.string().email().min(1, { message: 'Field cannot be blank' }),
	message: z.string().min(1, { message: 'Field cannot be blank' })
});

// Name has a default value just to display something in the form.
export const findInquiryByIDSchema = z.object({
	id: z.string().min(1, { message: 'Field cannot be blank' })
});
