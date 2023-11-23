import { getUserPlayerPayment } from "@/api-helpers/controllers/users-controller";
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
export const metadata: Metadata = {
	title: "Rise Up League | Register",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function Register({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
	await connectToDatabase();
	const session = await getServerSession();
	if (!session || !session.user) {
		redirect("/");
	}

	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	if (!user) {
		await addNewUser(session.user.name, session.user.email, "google");

		redirect("/");
	}

	return (
		<main className="font-barlow container  mx-auto min-h-[100dvh] text-white">
			<h1>Welcome to rise up basketball</h1>
			<h2 className="mt-2 text-center text-2xl font-semibold uppercase text-neutral-300 md:text-3xl">
				Winter Season 2024
			</h2>
			<section className="mt-20 flex flex-col gap-10 md:flex-row">
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
							Interested in hitting the court but you don’t have a full squad or
							have less than 5 players but still want to hoop with your friends?
							This is the perfect pick for you.{" "}
						</p>
					</div>
					<Link
						href={"/register/free-agent"}
						className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
					>
						Join as a free agent Now
					</Link>
				</div> */}
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
							As a team captain, you can invite your friends to create your
							dream team. To join as a full team, you will need a minimum of 9
							players to lock in your team. This means, no free agents will be
							added to your team. If you have less than 9 players before the
							deadline, free agents will be added to your team (up to a MINIMUM
							of 9 players).{" "}
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
