import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Worker from "@/api-helpers/models/Worker";
import { LoginSchema } from "@/schemas";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	callbacks: {
		async jwt({ token, user }) {
			console.log("token:", token);
			// if (!token.email) return token;
			const worker = await Worker.findOne({ email: token.email }).select(
				"type"
			);

			// if (!worker) return token;

			token.type = worker.type;
			return token;
		},
		async session({ session, token }) {
			session.user.type = token.type as string;
			console.log("callbackSession:", session);
			return session;
		},
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				console.log("credentials: ", credentials);
				const validatedFields = LoginSchema.safeParse(credentials);
				console.log("failed");
				if (validatedFields.success) {
					console.log("success");
					const { email, password } = validatedFields.data;
					const worker = await Worker.findOne({ email });
					if (!worker || !worker.password) return null;
					const passwordsMatch = worker.password === password;
					if (passwordsMatch) return worker;
				}
				return null;
			},
		}),
	],
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
