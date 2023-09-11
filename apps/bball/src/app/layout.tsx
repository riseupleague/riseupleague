import "./globals.css";
import "ui/styles.css";
import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Header from "@/src/components/structure/header/header";
import Footer from "@/src/components/structure/footer/footer";
import { type ChildrenProps } from "@/src/lib/types";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
	title: "Rise Up League",
	description: "Rise Up League",
};

export default function RootLayout({ children }: ChildrenProps): JSX.Element {
	return (
		<html className={`${oswald.variable} ${inter.variable}`} lang="en">
			<body className="bg-black text-white">
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
