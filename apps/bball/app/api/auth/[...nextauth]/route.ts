import { addNewUser } from "@/api-helpers/controllers/users-controller";
import User from "@/api-helpers/models/User";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// const authOptions = {
// 	providers: [
// 		GoogleProvider({
// 			clientId: process.env.GOOGLE_CLIENT_ID,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 		}),
// 		CredentialsProvider({
// 			name: "credentials",
// 			credentials: {
// 				email: { label: "Email", type: "text" },
// 				password: { label: "Password", type: "password" },
// 			},
// 			async authorize(credentials) {
// 				const { email, password } = credentials;

// 				try {
// 					const user = await User.findOne({ email });

// 					if (!user) {
// 						return null;
// 					}

// 					const passwordsMatch = await bcrypt.compare(password, user.password);

// 					if (!passwordsMatch) {
// 						return null;
// 					}

// 					return user;
// 				} catch (error) {
// 					console.log("Error:", error);
// 				}
// 				const user = { id: "1" };
// 				return user;
// 			},
// 		}),
// 	],

// 	session: {
// 		strategy: "jwt",
// 	},
// 	secret: process.env.NEXTAUTH_SECRET,
// 	pages: {
// 		signIn: "/",
// 	},
// 	callbacks: {
// 		async signIn({ user, account }) {
// 			// console.log("User:", user);
// 			// console.log("Account:", account);

// 			if (account.provider === "google") {
// 				const { name, email } = user;
// 				try {
// 					const userExists = await User.findOne({ email, type: "google" });

// 					console.log("userExists:", userExists);
// 					if (!userExists) {
// 						const newUser = await addNewUser(name, email, "google");
// 						console.log("newUser:", newUser);
// 					}
// 				} catch (e) {}
// 			}
// 			// Return user to indicate successful sign-in
// 			return user;
// 		},
// 	},
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
