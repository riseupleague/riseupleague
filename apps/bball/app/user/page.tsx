import { getCurrentUser } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/api-helpers/utils";
import UserProfile from "@/components/user/UserProfile";
import { Metadata } from "next";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@ui/components/card";
import Image from "next/image";
import { Button } from "@ui/components/button";
import Link from "next/link";
import Breadcrumb from "@/components/general/Breadcrumb";
export default async function User(): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();
	if (!session || !session.user) redirect("/");

	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	return (
		<section className="container mx-auto">
			<h1 className="text-start text-3xl lg:text-5xl">
				👋 Welcome Back {user.name}!
			</h1>
			<Breadcrumb />

			<div className="my-20 grid grid-cols-1 gap-5 md:grid-cols-3">
				{cardData.map((card, index) => (
					<Link
						key={index}
						className="rounded-lg bg-[#11161F]  transition duration-300 ease-in-out hover:bg-gray-800"
						href={card.link}
					>
						<Card className="relative flex  flex-col justify-center bg-transparent md:h-[394px]">
							<CardHeader>
								<Image
									className="mx-auto mb-6"
									src={card.imgSrc}
									alt={card.imgAlt}
									width={100}
									height={100}
								/>
								<CardTitle className="font-barlow text-center text-4xl font-medium md:text-3xl lg:text-5xl">
									{card.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="text-center">
								<CardDescription className="text-2xl text-neutral-200 md:text-lg">
									{card.description}
								</CardDescription>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | User",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

// export async function generateMetadata() {
// 	const session = await getServerSession();
// 	if (!session || !session.user) redirect("/");
// 	const resUser = await getCurrentUser(session.user.email);
// 	const { user } = await resUser.json();
// 	return {
// 		title: `Rise Up League | ${user.name}'s Profile`,
// 		description:
// 			"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
// 	};
// }
const cardData = [
	{
		title: "My Player",
		description:
			"Player name, personalized jersey information And Game Schedules.",
		imgSrc: "/images/profile/profile-player.svg",
		imgAlt: "Profile Player",
		link: "/user/player",
	},
	// {
	// 	title: "Season registration",
	// 	description: "Explore upcoming, and previous seasons",
	// 	imgSrc: "/images/profile/profile-season.svg",
	// 	imgAlt: "Profile Season",
	// 	link: "/user/history",
	// },
	// {
	// 	title: "My Rise Up Profile",
	// 	description: "An overview of your account’s current profile.",
	// 	imgSrc: "/images/profile/profile-setting.svg",
	// 	imgAlt: "Profile Setting",
	// 	link: "/user/setting",
	// },
];
