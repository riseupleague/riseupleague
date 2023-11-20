import "../../../packages/ui/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Oswald, Barlow_Condensed } from "next/font/google";
import Header from "../components/structure/header/header";
import Footer from "../components/structure/footer/footer";
import { type ChildrenProps } from "../lib/types";
import { NextAuthProvider } from "./Providers";
import GoogleAnalytics from "@/components/general/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const barlow = Barlow_Condensed({
	subsets: ["latin"],
	variable: "--font-barlow",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Rise Up League | Home",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and have Rise Up to the challenge!",
};

export default function RootLayout({ children }: ChildrenProps): JSX.Element {
	return (
		<html
			className={`${oswald.variable} ${inter.variable} ${barlow.variable}`}
			lang="en"
		>
			<body className="bg-neutral-900 text-neutral-100">
				{process.env.GOOGLE_ANALYTICS_ID ? (
					<GoogleAnalytics ga_id={process.env.GOOGLE_ANALYTICS_ID} />
				) : null}
				<NextAuthProvider>
					<Header />
					<main className="bball">{children}</main>
					<Footer />
				</NextAuthProvider>
			</body>
		</html>
	);
}
