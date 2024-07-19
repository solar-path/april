import { z } from 'zod';

export const changePasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, { message: 'Password length at least 8 characters' })
			.regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, {
				message: 'Password must contain at least one uppercase letter and one symbol'
			}),
		confirmPassword: z
			.string()
			.min(8, { message: 'Password length at least 8 characters' })
			.regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, {
				message: 'Password must contain at least one uppercase letter and one symbol'
			})
	})
	.refine((data) => data.password == data.confirmPassword, {
		message: "Passwords didn't match",
		path: ['confirm']
	});
