// import { addNewUser } from "@/api-helpers/controllers/users-controller";
// import Worker from "@/api-helpers/models/Worker";
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// const authOptions = {
// 	providers: [
// 		CredentialsProvider({
// 			name: "credentials",
// 			credentials: {
// 				email: { label: "Email", type: "text" },
// 				password: { label: "Password", type: "password" },
// 			},
// 			async authorize(credentials) {
// 				const { email, password } = credentials;

// 				try {
// 					const worker = await Worker.findOne({ email });

// 					if (!worker) return null;

// 					const passwordMatch = await bcrypt.compare(password, worker.password);

// 					if (!passwordMatch) return null;

// 					return worker;
// 				} catch (error) {
// 					console.error("Error during sign-in:", error);
// 					throw error;
// 				}
// 			},
// 		}),
// 	],
// 	session: {
// 		jwt: true,
// 		maxAge: 30 * 24 * 60 * 60, // 30 days
// 	},
// 	secret: process.env.NEXTAUTH_SECRET,
// 	pages: {
// 		signIn: "/",
// 	},
// };

// const handler = NextAuth(authOptions as any);

// export { handler as GET, handler as POST };

// // import { addNewUser } from "@/api-helpers/controllers/users-controller";
// // import Worker from "@/api-helpers/models/Worker";
// // import NextAuth from "next-auth/next";
// // import GoogleProvider from "next-auth/providers/google";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // import bcrypt from "bcryptjs";

// // const authOptions = {
// // 	providers: [
// // 		CredentialsProvider({
// // 			name: "credentials",
// // 			credentials: {
// // 				email: { label: "Email", type: "text" },
// // 				password: { label: "Password", type: "password" },
// // 			},
// // 			async authorize(credentials) {
// // 				const { email, password } = credentials;

// // 				try {
// // 					const worker = await Worker.findOne({ email });

// // 					if (!worker) return null;

// // 					return worker;
// // 				} catch (e) {
// // 					console.error("Error during sign-in:", e);
// // 				}
// // 				const worker = { id: "1" };
// // 				return worker;
// // 			},
// // 		}),
// // 	],
// // 	session: {
// // 		jwt: true,
// // 		maxAge: 30 * 24 * 60 * 60, // 30 days
// // 	},
// // 	callbacks: {
// // 		async session({ session, token }) {
// // 			console.log("session1:", session?.user);
// // 			return session;
// // 		},
// // 	},
// // 	secret: process.env.NEXTAUTH_SECRET,
// // 	pages: {
// // 		signIn: "/",
// // 	},
// // };

// // const handler = NextAuth(authOptions as any); // @ts-ignore

// // export { handler as GET, handler as POST };

// import { handlers } from "@/auth"; // Referring to the auth.ts we just created
// export const { GET, POST } = handlers;

// import NextAuth from "next-auth";
// import { options } from "./options";

// const handler = NextAuth(options);

// export { handler as GET, handler as POST };

// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import Worker from "@/api-helpers/models/Worker";

// const handler = NextAuth({
// 	session: {
// 		strategy: "jwt",
// 	},

// 	pages: {
// 		signIn: "/auth/login",
// 	},

// 	providers: [
// 		CredentialsProvider({
// 			name: "Credentials",
// 			credentials: {
// 				email: { label: "Email", type: "text" },
// 				password: { label: "Password", type: "password" },
// 			},
// 			async authorize(credentials) {
// 				const { email, password } = credentials;
// 				console.log("credentials:", credentials);
// 				try {
// 					const worker = await Worker.findOne({ email });

// 					console.log("worker:", worker);
// 					if (!worker) return null;
// 					const isPasswordMatch = password === worker.Password;
// 					if (isPasswordMatch) return worker;
// 				} catch (e) {
// 					console.error("Error during sign-in:", e);
// 				}
// 				const worker = { id: "1" };
// 				return worker;
// 			},
// 		}),
// 	],
// 	// callbacks: {
// 	// 	async jwt({ token, user }) {
// 	// 		console.log("user:", user);
// 	// 		return token;
// 	// 	},

// 	// 	async session({ session, token }) {
// 	// 		console.log("token:", token);

// 	// 		return session;
// 	// 	},
// 	// },
// });

// export { handler as GET, handler as POST };

import { handlers } from "@/auth";
export const { GET, POST } = handlers;
