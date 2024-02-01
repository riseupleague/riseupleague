import Login from "@/components/login/Login";
import { Metadata } from "next";

export default async function Page(): Promise<JSX.Element> {
	return (
		<div className="font-barlow container  mx-auto min-h-[100dvh] text-black">
			<Login />
		</div>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Log In",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
