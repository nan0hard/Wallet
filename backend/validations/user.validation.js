import { z } from "zod";

const signupValidator = z.object({
	firstName: z.string().min(3),
	lastName: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6).max(20),
});

const signinValidator = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

const updateProfileValidator = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	newPassword: z.string().optional(),
});

export { signupValidator, signinValidator, updateProfileValidator };
