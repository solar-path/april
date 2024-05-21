import { forgotPasswordSchema } from '$lib/auth/validation/forgot.schema';
import { loginSchema } from '$lib/auth/validation/login.schema';
import { registerSchema } from '$lib/auth/validation/register.schema';
import { contactUsSchema, findInquiryByIDSchema } from '$lib/forms/contact/contact.schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	const currentUser = event.locals.user;
	return {
		currentUser: currentUser ? currentUser : null,
		loginForm: await superValidate(zod(loginSchema)),
		registerForm: await superValidate(zod(registerSchema)),
		contactUsForm: await superValidate(zod(contactUsSchema)),
		trackInquiryForm: await superValidate(zod(findInquiryByIDSchema)),
		forgotPasswordForm: await superValidate(zod(forgotPasswordSchema))
	};
};
