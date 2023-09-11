import "./globals.css";
import "ui/styles.css";
import type { Metadata } from "next";
import { Inter, Oswald, Barlow_Condensed } from "next/font/google";
import Header from "@/src/components/structure/header/header";
import Footer from "@/src/components/structure/footer/footer";
import { type ChildrenProps } from "@/src/lib/types";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const barlow = Barlow_Condensed({
	subsets: ["latin"],
	variable: "--font-barlow",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Rise Up League",
	description: "Rise Up League",
};

export default function RootLayout({ children }: ChildrenProps): JSX.Element {
	return (
		<html
			className={`${oswald.variable} ${inter.variable} ${barlow.variable}`}
			lang="en"
		>
			<body className="bg-neutral-900 text-neutral-100">
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
