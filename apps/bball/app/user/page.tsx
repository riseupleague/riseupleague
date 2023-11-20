import { getCurrentUser } from "@/api-helpers/controllers/users-controller";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rise Up League | User",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function User(): Promise<JSX.Element> {
	await connectToDatabase();
	const session = await getServerSession();
	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();
	if (!session || !session.user) {
		redirect("/");
	} else {
		redirect(`/user/${user._id}`);
	}

	return (
		<main className="font-barlow container  mx-auto min-h-[100dvh] text-white">
			<h1>Welcome to rise up basketball</h1>
		</main>
	);
}
