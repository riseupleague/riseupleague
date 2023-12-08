import { getUserPlayerPayment } from "@/api-helpers/controllers/users-controller";
import { Separator } from "@ui/components/separator";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "@ui/components/button";
import { getRegisterDivisionById } from "@/api-helpers/controllers/divisions-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Rise Up League | Success!",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
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
	const resDivision = await getRegisterDivisionById(params.id);
	const { division } = await resDivision.json();
	const resPlayer = await getUserPlayerPayment(session.user.email);
	const { players, season } = await resPlayer.json();

	console.log(players);

	const selectedPlayer = players.find((player) => {
		return player.season.toString() === season;
	});

	console.log("selectedPlayer:", selectedPlayer);

	const convertToAMPM = (timeString) => {
		let formattedTime;
		if (timeString) {
			const [hours, minutes] = timeString.split(":");
			const date = new Date(2023, 0, 1, hours, minutes); // Assuming year 2023, month 0 (January), day 1

			// Format the time to AM/PM
			formattedTime = date.toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "numeric",
				hour12: true,
			});
		}

		return formattedTime;
	};

	// Example usage:
	const startTimeAMPM = convertToAMPM(division?.startTime);
	const endTimeAMPM = convertToAMPM(division?.endTime);
	console.log("selectedPlayer:", selectedPlayer);
	return (
		<main className="font-barlow container  mx-auto min-h-[100dvh] text-white">
			{selectedPlayer?.freeAgent ? (
				<h1 className=" mt-10 text-center text-4xl font-bold uppercase md:mt-20 md:text-6xl">
					You have successfully registered as a Free Agent in{" "}
					{division?.divisionName} division!{" "}
				</h1>
			) : (
				<h1 className=" mt-10 text-center text-4xl font-bold uppercase md:mt-20 md:text-6xl">
					You have successfully{" "}
					{selectedPlayer?.teamCaptain ? "registered" : "joined"}{" "}
					{selectedPlayer?.team?.teamName}{" "}
					{selectedPlayer?.teamCaptain ? "to" : "in"} {division?.divisionName}{" "}
					division!{" "}
				</h1>
			)}
			<h2 className=" mt-4 text-center text-lg font-semibold uppercase text-neutral-300 md:text-3xl">
				An email has been sent to {session.user.email}
			</h2>

			<h3 className=" mt-16 text-center text-4xl uppercase md:text-start">
				Season Summary
			</h3>
			<ul className="my-5 rounded border border-neutral-600 p-3 uppercase text-white">
				<li className="my-1">Division: {division?.divisionName}</li>
				<li className="my-1">Arena: {division?.location}</li>
				<li className="my-1">
					Game Days: {division?.day} at {startTimeAMPM} - {endTimeAMPM}
				</li>
				<li className="my-1">
					Season Length: 7 Regular games + 1 guaranteed playoff game
				</li>
			</ul>

			<h3 className=" mt-16 text-center text-4xl uppercase md:text-start">
				Registration Next Steps
			</h3>
			{selectedPlayer?.freeAgent ? (
				<section className="mt-5">
					<div className="flex flex-1 flex-col justify-between gap-5 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
						<p>
							We will put you in a team and let you know one week before the
							season starts. The season starts around January 20th! We will
							email you or message you on instagram! For now check your profile
							previousGames
						</p>
						<Link
							className=" font-barlow w-full rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
							href={`/user`}
						>
							Check Out Your Profile
						</Link>
					</div>
				</section>
			) : (
				<section className="mt-10 flex flex-col gap-10 md:flex-row">
					<div className="flex flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
						<div>
							<h3 className=" text-2xl font-semibold uppercase ">
								Team Jersey
							</h3>
							<Separator
								orientation="horizontal"
								className="mb-3 mt-1 bg-white"
							/>{" "}
							<p>
								Customize your team jersey. You decide your own colors and
								designs!
							</p>
						</div>
						<Link
							className=" font-barlow w-full rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
							href={`/jersey/${selectedPlayer?.team?._id}`}
						>
							Continue
						</Link>
					</div>
					<div className="flex flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
						<div>
							<h3 className=" text-2xl font-semibold uppercase ">
								Team Schedule
							</h3>
							<Separator
								orientation="horizontal"
								className="mb-3 mt-1 bg-white"
							/>{" "}
							<p>You decide on what time your team will play in. </p>{" "}
						</div>
						<Button className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200">
							Coming Soon
						</Button>
					</div>
				</section>
			)}
		</main>
	);
}
