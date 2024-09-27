import "./globals.css";
import type { Metadata } from "next";
import { Inter, Oswald, Barlow_Condensed } from "next/font/google";
import { NextAuthProvider } from "./Providers";
// import Header from "@/components/structure/header/Header";
// import Sidebar from "@/components/structure/sidebar/Sidebar";
// import { Toaster } from "@ui/components/toaster";
import { getServerSession } from "next-auth";
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
	return (
		<html
			className={`${oswald.variable} ${inter.variable} ${barlow.variable}`}
			lang="en"
		>
			<body className="font-barlow bg-neutral-900 text-neutral-100">
				<NextAuthProvider>{children}</NextAuthProvider>
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
