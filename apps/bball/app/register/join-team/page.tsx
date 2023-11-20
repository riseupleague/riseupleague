import { connectToDatabase } from "@/api-helpers/utils";
import { getAllRegisterDivisions } from "@/api-helpers/controllers/divisions-controller";
import { getUserPlayerPayment } from "@/api-helpers/controllers/users-controller";

import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";
import { Separator } from "@ui/components/separator";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CreateYourTeam from "@/components/register/CreateYourTeam";
export default async function JoinTeam(): Promise<JSX.Element> {
	await connectToDatabase();
	const session = await getServerSession();

	if (!session || !session.user) {
		redirect("/");
	}
	const resDivisions = await getAllRegisterDivisions();
	const { divisions } = await resDivisions.json();

	const resPlayer = await getUserPlayerPayment(session.user.email);
	const { players, season } = await resPlayer.json();
	console.log("players:", players);
	let filteredDivisions = [...divisions];
	if (players && players.length > 0) {
		filteredDivisions = filteredDivisions.filter((division) => {
			// Check if every players division is not equal to the current division
			return players.every((player) => {
				return player.division?._id !== division._id;
			});
		});
	}

	console.log("filteredDivisions:", filteredDivisions);

	return (
		<main className="font-barlow container  mx-auto my-10 min-h-[100dvh] text-white">
			<h1 className=" mt-5 text-right text-7xl font-semibold uppercase text-neutral-700 md:mt-20 md:text-center  md:text-white">
				Join a team
			</h1>

			<CreateYourTeam divisions={filteredDivisions} category="join" />
		</main>
	);
}
