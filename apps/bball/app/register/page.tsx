import { connectToDatabase } from "@/api-helpers/utils";
import { Separator } from "@ui/components/separator";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
	getCurrentUser,
	addNewUser,
} from "@/api-helpers/controllers/users-controller";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@ui/components/card";
import Image from "next/image";

export default async function Register(): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();
	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	if (!user) {
		await addNewUser(session.user.name, session.user.email, "google");

		redirect("/");
	}

	return (
		<main className="font-barlow container  mx-auto min-h-[100dvh] text-white">
			<p className="mb-0  mt-2 text-center text-xl md:text-3xl">Season 5</p>
			<h1 className="mt-1">Welcome to rise up basketball</h1>
			<h2 className="text-center text-xl font-semibold uppercase text-neutral-300 md:text-4xl">
				League with the best player experience
			</h2>
			<section className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3">
				<Card className="relative flex h-[494px] flex-col   justify-end bg-transparent">
					<Image
						src={"/images/register/joinFreeAgent.jpg"}
						alt="join as a free agent photo"
						layout="fill"
						objectFit="cover"
						className="absolute inset-0 -z-10 bg-gradient-to-b opacity-50"
					/>
					<CardHeader>
						<CardTitle> JOIN AS A FREE AGENT</CardTitle>
						<CardDescription>
							Don’t have a full squad? This is the perfect pick for you. Join as
							a solo player or groups of 4 or less players.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-center">
						<Link
							href={"/register/free-agent"}
							className="font-barlow block rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
						>
							Join as a free agent Now
						</Link>
					</CardContent>
				</Card>
				<Card className="relative flex h-[494px] flex-col   justify-end bg-transparent">
					<Image
						src={"/images/register/createteam.jpg"}
						alt="join as a free agent photo"
						layout="fill"
						objectFit="cover"
						className="absolute inset-0 -z-10 bg-gradient-to-b opacity-50"
					/>
					<CardHeader>
						<CardTitle> Create a team</CardTitle>
						<CardDescription>
							Recruit a full team of at least 9 players to secure your roster.
							Less than 9 players by the deadline, free agents will be added.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-center">
						<Link
							href={"/register/create-team"}
							className="font-barlow block rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
						>
							Create Team Now
						</Link>
					</CardContent>
				</Card>
				<Card className="relative flex h-[494px] flex-col   justify-end bg-transparent">
					<Image
						src={"/images/register/joinTeam.jpg"}
						alt="join as a free agent photo"
						layout="fill"
						objectFit="cover"
						className="absolute inset-0 -z-10 bg-gradient-to-b opacity-50"
					/>
					<CardHeader>
						<CardTitle> Join A team</CardTitle>
						<CardDescription>
							Find your squad and enter the code your team captain has received.{" "}
						</CardDescription>
					</CardHeader>
					<CardContent className="text-center">
						<Link
							href={"/register/join-team"}
							className="font-barlow block rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
						>
							Join a team now
						</Link>
					</CardContent>
				</Card>
				{/* <div className="flex flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
					<div>
						<h3 className=" text-2xl font-semibold uppercase ">
							JOIN AS A FREE AGENT
						</h3>
						<Separator
							orientation="horizontal"
							className="mb-3 mt-1 bg-white"
						/>{" "}
						<p>
							Don’t have a full squad? This is the perfect pick for you. Join as
							a solo player or groups of 4 or less players.
						</p>
					</div>
					<Link
						href={"/register/free-agent"}
						className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
					>
						Join as a free agent Now
					</Link>
				</div>
				<div className="flex flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
					<div>
						<h3 className=" text-2xl font-semibold uppercase ">
							Create a team
						</h3>
						<Separator
							orientation="horizontal"
							className="mb-3 mt-1 bg-white"
						/>{" "}
						<p>
							Recruit a full team of at least 9 players to secure your roster.
							Less than 9 players by the deadline, free agents will be added.
						</p>
					</div>
					<Link
						href={"/register/create-team"}
						className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
					>
						Create Team Now
					</Link>
				</div>
				<div className="flex flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
					<div>
						<h3 className=" text-2xl font-semibold uppercase ">Join A team</h3>
						<Separator
							orientation="horizontal"
							className="mb-3 mt-1 bg-white"
						/>{" "}
						<p>
							Find your squad and enter the code your team captain has received.{" "}
						</p>{" "}
					</div>
					<Link
						href={"/register/join-team"}
						className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
					>
						Join a team now
					</Link>
				</div> */}
			</section>
		</main>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Register",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
