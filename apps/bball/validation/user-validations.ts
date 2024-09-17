import { z } from "zod";

export const userEmailSchema = z.string().email({ message: "Invalid email." });

export const createUserSchema = z.object({
	name: z.string().min(4, { message: "Name must be at least 4 characters." }),
	email: userEmailSchema,
	password: z
		.string()
		.min(4, { message: "Password must be at least 4 characters." }),
});

export const newPasswordSchema = z
	.string()
	.min(4, { message: "Password must be at least 4 characters." });
