import { addNewUser } from "@/api-helpers/controllers/users-controller";
import User from "@/api-helpers/models/User";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		// CredentialsProvider({
		// 	name: "credentials",
		// 	credentials: {
		// 		email: { label: "Email", type: "text" },
		// 		password: { label: "Password", type: "password" },
		// 	},
		// 	async authorize(credentials) {
		// 		const { email, password } = credentials;

		// 		try {
		// 			const user = await User.findOne({ email });

		// 			if (!user) return null;

		// 			const passwordsMatch = await bcrypt.compare(password, user.password);

		// 			if (!passwordsMatch) return null;

		// 			return user;
		// 		} catch (e) {
		// 			console.error("Error during sign-in:", e);
		// 		}
		// 		const user = { id: "1" };
		// 		return user;
		// 	},
		// }),
	],
};

const handler = NextAuth(authOptions as any); // @ts-ignore

export { handler as GET, handler as POST };
