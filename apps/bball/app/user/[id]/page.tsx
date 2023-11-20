import { getUserPlayerPayment } from "@/api-helpers/controllers/users-controller";
import { Separator } from "@ui/components/separator";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@ui/components/button";
import { getRegisterDivisionById } from "@/api-helpers/controllers/divisions-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rise Up League | User",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and have Rise Up to the challenge!",
};

export default async function Success({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();
	const session = await getServerSession();
	if (!session || !session.user) {
		redirect("/");
	}

	return (
		<main className="container mx-auto min-h-[100dvh]">
			<h1>Welcome to rise up basketball. Please join a team!</h1>
		</main>
	);
}
