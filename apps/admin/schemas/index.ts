import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, {
		message: "Password is required.",
	}),
});

// Define the allowed user roles
const UserRole = z.enum(["owner", "commissioner", "worker"]);

export const RegisterSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4, {
		message: "Password is required.",
	}),
	name: z.string().min(1, {
		message: "Name is requierd.",
	}),
	type: UserRole,
});
