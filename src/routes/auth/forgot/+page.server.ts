import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { forgotPasswordSchema } from './forgot.schema';

export const load = async () => {
	return {
		forgotPasswordForm: await superValidate(zod(forgotPasswordSchema))
	};
};
