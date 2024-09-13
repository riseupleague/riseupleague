import "../../../../packages/ui/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Oswald, Barlow_Condensed } from "next/font/google";
import { Toaster } from "@ui/components/toaster";
import { NextAuthProvider } from "../Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const barlow = Barlow_Condensed({
	subsets: ["latin"],
	variable: "--font-barlow",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const DashboardLayout = ({ children }): JSX.Element => {
	return (
		<html
			className={`${oswald.variable} ${inter.variable} ${barlow.variable}`}
			lang="en"
		>
			<body className="font-barlow bg-neutral-900 text-neutral-100">
				{/* <NextAuthProvider> */}
				<main className="stats">{children}</main>
				{/* </NextAuthProvider> */}

				<Toaster />
			</body>
		</html>
	);
};

export const metadata: Metadata = {
	title: "Rise Up League | Stat Tracker",
	description: "Rise Up League Stat Tracker",
};

export default DashboardLayout;
