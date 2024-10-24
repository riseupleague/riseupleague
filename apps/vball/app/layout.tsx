import "../../../packages/ui/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Oswald, Barlow_Condensed } from "next/font/google";
import { Toaster } from "@ui/components/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const barlow = Barlow_Condensed({
	subsets: ["latin"],
	variable: "--font-barlow",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const RootLayout = ({ children }): JSX.Element => {
	return (
		<html
			className={`${oswald.variable} ${inter.variable} ${barlow.variable}`}
			lang="en"
		>
			<body className="font-barlow bg-white text-black">
				<main className="vball">{children}</main>
				<Toaster />
			</body>
		</html>
	);
};

export const metadata: Metadata = {
	title: "Rise Up League | Volleyball",
	description: "Rise Up League Volleyball Site",
};

export default RootLayout;
