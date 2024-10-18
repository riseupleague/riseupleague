export { default } from "next-auth/middleware";

export const config = {
	matcher: [
		"/user/:path*",
		"/choose-team-schedule",
		"/choose-team-schedule/:path*",
		"/jersey",
		"/jersey/:path*",
		"/success",
		"/success/:path*",
	],
};
