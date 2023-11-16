import { getUserPlayerPayment } from "@/api-helpers/controllers/users-controller";
import { Separator } from "@ui/components/separator";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@ui/components/button";
import { getRegisterDivisionById } from "@/api-helpers/controllers/divisions-controller";
import { connectToDatabase } from "@/api-helpers/utils";

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
	// const resPlayer = await getUserPlayerPayment(session.user.email);
	// const { players, season } = await resPlayer.json();
	// console.log(players);
	// const convertToAMPM = (timeString) => {
	// 	const [hours, minutes] = timeString.split(":");
	// 	const date = new Date(2023, 0, 1, hours, minutes); // Assuming year 2023, month 0 (January), day 1

	// 	// Format the time to AM/PM
	// 	const formattedTime = date.toLocaleTimeString("en-US", {
	// 		hour: "numeric",
	// 		minute: "numeric",
	// 		hour12: true,
	// 	});

	// 	return formattedTime;
	// };

	// // Example usage:

	return (
		<main className="font-barlow container  mx-auto min-h-[100dvh] text-white">
			<h1 className=" mt-5 text-center text-4xl font-bold uppercase md:mt-20 md:text-6xl">
				Welcome to rise up basketball. Please join a team !
			</h1>
		</main>
	);
}
