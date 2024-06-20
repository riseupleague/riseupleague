import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes,
} from "./routes";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);
export default auth(async (req) => {
	const { nextUrl } = req;
	const session = await auth();
	const isLoggedIn = !!req.auth;
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	console.log("session:", session);
	if (isApiAuthRoute) return null;

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return null;
	}

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL("/auth/login", nextUrl));
	}

	return null;
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import {
// 	DEFAULT_LOGIN_REDIRECT,
// 	apiAuthPrefix,
// 	authRoutes,
// 	publicRoutes,
// } from "./routes";
// export default withAuth(
// 	function middleware(req) {
// 		console.log(req.nextUrl.pathname);
// 		console.log("req.nextauth.token:", req.nextauth.token);

// 		const { nextUrl } = req;
// 		const isLoggedIn = !!req.nextauth.token;
// 		const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
// 		const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
// 		const isAuthRoute = authRoutes.includes(nextUrl.pathname);
// 		console.log(isLoggedIn, isPublicRoute, "hello");

// 		if (isApiAuthRoute) return null;

// 		if (isAuthRoute) {
// 			if (isLoggedIn) {
// 				return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
// 			}
// 			return null;
// 		}

// 		if (!isLoggedIn && !isPublicRoute) {
// 			return Response.redirect(new URL("/auth/login", nextUrl));
// 		}
// 	},
// 	{
// 		callbacks: {
// 			authorized: ({ token }) => !!token,
// 		},
// 	}
// );
// export const config = {
// 	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
