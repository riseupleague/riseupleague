import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@ui/components/button";
import {
	getCurrentUser,
	addNewUser,
} from "@/api-helpers/controllers/users-controller";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@ui/components/card";

import RegisterPageInfo from "@/components/register/register-info/RegisterPageInfo";
import RegisterCTABanner from "@/components/register/register-info/RegisterCTABanner";

export default async function Register({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();
	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	if (!user) {
		await addNewUser(session.user.name, session.user.email, "google");

		redirect("/");
	}

	const info = typeof searchParams.info === "string" ? searchParams.info : "";

	return (
		<>
			{info === "true" ? (
				<RegisterPageInfo />
			) : (
				<main className="font-barlow container mx-auto min-h-fit text-white">
					<p className="font-barlow mb-0 mt-10 text-center text-xl font-medium uppercase md:text-3xl">
						Season 5
					</p>
					<h1 className="font-abolition mb-5 mt-1 text-7xl">
						Welcome to rise up basketball
					</h1>
					<h2 className="font-barlow m-0 text-center text-xl font-medium uppercase text-white md:text-[28px]">
						League with the best player experience
					</h2>
					<section className="my-20 grid grid-cols-1 gap-5 md:grid-cols-3">
						{cardData.map((card, index) => (
							<Card
								key={index}
								className="relative flex h-[494px] flex-col justify-end bg-transparent"
							>
								<Image
									src={card.imgSrc}
									alt={card.imgAlt}
									fill
									className="absolute inset-0 -z-10 bg-gradient-to-b object-cover opacity-50"
								/>
								<CardHeader>
									<CardTitle className="font-abolition text-5xl font-medium">
										{card.title}
									</CardTitle>
									<CardDescription className="font-barlow text-xl leading-6 text-neutral-200">
										{card.description}
									</CardDescription>
								</CardHeader>
								<CardContent className="text-center">
									{card.btnText === "Coming soon" ? (
										<Button
											disabled
											className="font-barlow block w-full cursor-not-allowed rounded bg-neutral-100 px-12 py-2 text-center font-semibold uppercase text-neutral-900 transition hover:bg-neutral-200"
										>
											Coming Soon!
										</Button>
									) : (
										<Link
											href={card.href}
											className="font-barlow block rounded bg-neutral-100 px-12 py-2 text-center font-semibold uppercase text-neutral-900 transition hover:bg-neutral-200"
										>
											{card.btnText}
										</Link>
									)}
								</CardContent>
							</Card>
						))}
					</section>

					<RegisterCTABanner
						description={"Need more information?"}
						ctaLink={"/register?info=true"}
						ctaText={"Click Here"}
					/>
				</main>
			)}
		</>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Register",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

const cardData = [
	{
		title: "Join as a free agent",
		description:
			"Don’t have a full squad? This is the perfect pick for you. Join as a solo player or groups of 4 or less players.",
		imgSrc: "/images/register/joinFreeAgent.jpg",
		imgAlt: "Join as a free agent Now",
		btnText: "Join as a free agent Now",
		href: "/register/free-agent",
	},
	{
		title: "Create A team",
		description:
			"Recruit a full team of at least 9 players to secure your roster. Less than 9 players by the deadline, free agents will be added.",
		imgSrc: "/images/register/createTeam.jpg",
		imgAlt: "Create a team now",
		btnText: "Create a Team now",
		href: "/register/create-team",
	},
	{
		title: "Join a team",
		description:
			"Find your squad and enter the code your team captain has received.",
		imgSrc: "/images/register/joinTeam.jpg",
		imgAlt: "join as a free agent photo",
		btnText: "Join your Team now",
		href: "/register/join-team",
	},
];
