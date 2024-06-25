import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Worker from "@/api-helpers/models/Worker";
import { LoginSchema } from "@/schemas";

const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				const worker = await Worker.findOne({ email: user.email }).select(
					"type"
				);
				token.type = worker ? worker.type : null;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.type = token.type as string;
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
				const validatedFields = LoginSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;
					const worker = await Worker.findOne({ email });

					if (worker && worker.password === password) return worker;
				}

				return null;
			},
		}),
	],
	pages: {
		signIn: "/auth/login",
	},
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
