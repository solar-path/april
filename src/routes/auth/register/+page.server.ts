import { registerSchema } from './register.schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	return {
		registerForm: await superValidate(zod(registerSchema))
	};
};
