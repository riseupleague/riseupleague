import "../../../packages/ui/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Oswald, Barlow_Condensed } from "next/font/google";
import Header from "@/components/structure/header/Header";
import Sidebar from "@/components/structure/sidebar/Sidebar";
import { Toaster } from "@ui/components/toaster";
import SessionProvider from "@/components/auth/SessionProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const barlow = Barlow_Condensed({
	subsets: ["latin"],
	variable: "--font-barlow",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const RootLayout = async ({ children }): Promise<JSX.Element> => {
	const session = await getServerSession();

	// if (!session) redirect("/api/auth/signin");

	return (
		<html
			className={`${oswald.variable} ${inter.variable} ${barlow.variable}`}
			lang="en"
		>
			<body className="font-barlow bg-neutral-900 text-neutral-100">
				<SessionProvider session={session}>
					<Header />
					<main>
						<Sidebar />
						<div className="sm:ml-[189px]">
							<div className="container mx-auto py-4">{children}</div>
						</div>
					</main>
					<Toaster />
				</SessionProvider>
			</body>
		</html>
	);
};

export const metadata: Metadata = {
	title: "Rise Up League | Admin",
	description: "Rise Up League Admin Site",
};

export default RootLayout;
