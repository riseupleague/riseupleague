import "../../../packages/ui/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Oswald, Barlow_Condensed } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const barlow = Barlow_Condensed({
	subsets: ["latin"],
	variable: "--font-barlow",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Rise Up League | Admin",
	description: "Rise Up League Admin Site",
};

export default function RootLayout({ children }) {
	return (
		<html
			className={`${oswald.variable} ${inter.variable} ${barlow.variable}`}
			lang="en"
		>
			<body className="bg-neutral-900 text-neutral-100">
				<main>{children}</main>
			</body>
		</html>
	);
}
