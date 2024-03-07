import { getCurrentUserPlayers } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";

export default async function Jersey(): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();
	const resUser = await getCurrentUserPlayers(session.user.email);

	const { user, season } = await resUser.json();

	return (
		<section className="container mx-auto min-h-fit">
			<h1 className="mb-10">Jersey Locker</h1>

			<h3 className="mt-10 text-3xl font-medium uppercase">Select Your Team</h3>

			<div className="mt-10 flex flex-col gap-10 md:flex-row ">
				{user.basketball.map(
					(player) =>
						player.team &&
						player.season._id === season._id && (
							<Link
								href={`/jersey/${player.team?._id}`}
								key={player._id}
								className="rounded-5 flex flex-col gap-5 bg-neutral-700 px-[16px] py-[26px] text-start "
							>
								{player.team?.teamName}
							</Link>
						)
				)}
			</div>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Jersey Selection",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
