import "../../../packages/ui/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Oswald, Barlow_Condensed } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
// import Header from "@/components/structure/header/Header";
// import Sidebar from "@/components/structure/sidebar/Sidebar";
// import { Toaster } from "@ui/components/toaster";
import { NextAuthProvider } from "./Providers";
// import { getAllSeasons } from "@/api-helpers/controllers/seasons-controller";
// import { connectToDatabase } from "@/api-helpers/utils";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const barlow = Barlow_Condensed({
	subsets: ["latin"],
	variable: "--font-barlow",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const RootLayout = async ({ children }): Promise<JSX.Element> => {
	// await connectToDatabase();

	// // Fetch all seasons
	// const resSeasons = await getAllSeasons();
	// const { seasons } = await resSeasons.json();

	// // Find the active season
	// const activeSeason = seasons.find((season) => season.active === true);

	const session = await auth();
	return (
		<html
			className={`${oswald.variable} ${inter.variable} ${barlow.variable}`}
			lang="en"
		>
			<body className="font-barlow bg-neutral-900 text-neutral-100">
				<SessionProvider session={session}>{children} </SessionProvider>
			</body>
		</html>
	);
};

export const metadata: Metadata = {
	title: "Rise Up League Admin",
	description: "Rise Up League Admin Site",
	robots: "noindex, nofollow",
};

export default RootLayout;
