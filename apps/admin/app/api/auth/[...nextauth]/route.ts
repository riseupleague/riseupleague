import { addNewUser } from "@/api-helpers/controllers/users-controller";
import Worker from "@/api-helpers/models/Worker";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { email, password } = credentials;

				try {
					const worker = await Worker.findOne({ email });

					if (!worker) return null;

					const passwordMatch = await bcrypt.compare(password, worker.password);

					if (!passwordMatch) return null;

					return worker;
				} catch (error) {
					console.error("Error during sign-in:", error);
					throw error;
				}
			},
		}),
	],
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/",
	},
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };

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

// 					return worker;
// 				} catch (e) {
// 					console.error("Error during sign-in:", e);
// 				}
// 				const worker = { id: "1" };
// 				return worker;
// 			},
// 		}),
// 	],
// 	session: {
// 		jwt: true,
// 		maxAge: 30 * 24 * 60 * 60, // 30 days
// 	},
// 	callbacks: {
// 		async session({ session, token }) {
// 			console.log("session1:", session?.user);
// 			return session;
// 		},
// 	},
// 	secret: process.env.NEXTAUTH_SECRET,
// 	pages: {
// 		signIn: "/",
// 	},
// };

// const handler = NextAuth(authOptions as any); // @ts-ignore

// export { handler as GET, handler as POST };
