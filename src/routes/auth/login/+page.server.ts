import { loginSchema } from './login.schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	return {
		loginForm: await superValidate(zod(loginSchema))
	};
};
