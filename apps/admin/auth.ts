import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import Worker from "./api-helpers/models/Worker";
import { authConfig } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,

	callbacks: {
		async session({ session, token }) {
			session.user.type = token.type as string;

			return session;
		},
		async jwt({ token, user }) {
			// if (!token.email) return token;
			const worker = await Worker.findOne({ email: token.email }).select(
				"type"
			);
			// if (!worker) return token;

			token.type = worker.type;
			return token;
		},
	},
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},

	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				console.log("credentials: ", credentials);
				const validatedFields = LoginSchema.safeParse(credentials);
				console.log("failed");

				if (validatedFields.success) {
					console.log("success");
					const { email, password } = validatedFields.data;

					const worker = await Worker.findOne({ email });
					console.log("worker:", worker);
					if (!worker || !worker.password) return null;
					const passwordsMatch = worker.password === password;
					if (passwordsMatch) return worker;
				}
				return null;
			},
		}),
	],
});
