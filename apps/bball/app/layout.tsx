import "../../../packages/ui/styles/globals.css";
import { Inter, Oswald, Barlow_Condensed } from "next/font/google";
import Header from "../components/structure/header-components/Header";
import Footer from "../components/structure/footer-components/Footer";
import { NextAuthProvider } from "./Providers";
import GoogleAnalytics from "@/components/general/GoogleAnalytics";
import { Toaster } from "@ui/components/toaster";
import { ChildrenProps } from "@/types";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const barlow = Barlow_Condensed({
	subsets: ["latin"],
	variable: "--font-barlow",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const abolition = localFont({
	src: [
		{
			path: "../lib/fonts/AbolitionTest-Regular.otf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-abolition",
});

const RootLayout = ({ children }: ChildrenProps): JSX.Element => {
	return (
		<html
			className={`${oswald.variable} ${inter.variable} ${barlow.variable} ${abolition.variable}`}
			lang="en"
		>
			<body className="bg-neutral-900 text-neutral-100">
				{process.env.GOOGLE_ANALYTICS_ID ? (
					<GoogleAnalytics ga_id={process.env.GOOGLE_ANALYTICS_ID} />
				) : null}
				<NextAuthProvider>
					{/* <Header /> */}
					<main className="bball">{children}</main>
					{/* <Footer /> */}
					<Toaster />
				</NextAuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
