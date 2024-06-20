// import Credentials from "next-auth/providers/credentials";
// import Github from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import Worker from "./api-helpers/models/Worker";

import { LoginSchema } from "@/schemas";

// export default {
// 	providers: [
// 		CredentialsProvider({
// 			async authorize(credentials) {
// 				console.log("credentials: ", credentials);
// 				const validatedFields = LoginSchema.safeParse(credentials);
// 				console.log("failed");

// 				if (validatedFields.success) {
// 					console.log("success");
// 					const { email, password } = validatedFields.data;

// 					const worker = await Worker.findOne({ email });
// 					if (!worker || !worker.password) return null;
// 					const passwordsMatch = worker.password === password;
// 					if (passwordsMatch) return worker;
// 				}
// 				return null;
// 			},
// 		}),
// 	],
// } satisfies NextAuthConfig;

export const authConfig = {
	providers: [],
} satisfies NextAuthConfig;
