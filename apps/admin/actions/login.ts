"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	console.log(values);

	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "error message" };
	}
	const { email, password } = validatedFields.data;
	console.log(email, password);
	try {
		console.log("1");
		await signIn("credentials", {
			email,
			password,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin": {
					return {
						error: "Invalid credentials!",
					};
				}
				default: {
					return { error: "Something went wrong!" };
				}
			}
		}
		throw error;
	}

	return {
		success: "success message",
	};
};
