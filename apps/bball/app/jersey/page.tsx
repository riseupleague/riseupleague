import {
	getCurrentUser,
	getUserPlayerPayment,
} from "@/api-helpers/controllers/users-controller";
import { Separator } from "@ui/components/separator";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@ui/components/button";
import { getRegisterDivisionById } from "@/api-helpers/controllers/divisions-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { getTeamById } from "@/api-helpers/controllers/teams-controller";
import JerseySelection from "@/components/register/custom-jersey/JerseySelection";

export const metadata: Metadata = {
	title: "Rise Up League | Jersey Selection",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function Jersey(): Promise<JSX.Element> {
	await connectToDatabase();
	const session = await getServerSession();
	if (!session || !session.user) {
		redirect("/");
	}

	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="mb-10">Jersey Locker</h1>

			<h3 className="mt-10  text-3xl uppercase">Select Your Team</h3>

			<div className="mt-10 flex flex-col gap-10 md:flex-row ">
				{user.basketball.map((player) => (
					<Link
						href={`/jersey/${player.team._id}`}
						key={player._id}
						className="rounded-5 flex flex-col gap-5 bg-neutral-700 px-[16px] py-[26px] text-start "
					>
						{player.team.teamName}
					</Link>
				))}
			</div>

			{/* <JerseySelection team={team?._id} /> */}
		</section>
	);
}
