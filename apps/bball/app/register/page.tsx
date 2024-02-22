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
			<section className="mt-20 flex flex-col gap-10 md:flex-row">
				<div className="flex flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
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
				</div>
			</section>
		</main>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Register",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
