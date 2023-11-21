import Login from "@/components/login/Login";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Rise Up League | Log In",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function Page(): Promise<JSX.Element> {
	const session = await getServerSession();

	if (session || session?.user) {
		redirect("/");
	}

	return (
		<div className="font-barlow container  mx-auto min-h-[100dvh] text-black">
			<Login />
		</div>
	);
}
