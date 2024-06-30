import { Button } from "@ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@ui/components/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TournamentSelection = ({ onDivision, targetRef }) => {
	return (
		<div ref={targetRef} className="container mx-auto mt-20">
			<h2 className="font-abolition text-center text-3xl md:text-5xl">
				Is your team ready to claim the title of the best?
			</h2>
			<div className="my-20 grid grid-cols-1 gap-5 md:grid-cols-3">
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
								<Button
									onClick={() => onDivision(card._id)}
									className="font-barlow block rounded bg-neutral-100 px-12 py-2 text-center font-semibold uppercase text-neutral-900 transition hover:bg-neutral-200"
								>
									{card.btnText}
								</Button>
							)}
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

const cardData = [
	{
		title: "All Asians",
		description: "Calling all Asians!",
		imgSrc: "/images/register/joinFreeAgent.jpg",
		imgAlt: "Join as a free agent Now",
		// btnText: "Join as a free agent Now",
		btnText: "Register Now",
		href: "/register/tournament/all-asians",
		_id: "all-asians",
	},
	{
		title: "All man`s under 6ft",
		description: "Calling all guards!",
		imgSrc: "/images/register/createTeam.jpg",
		imgAlt: "Create a team now",
		btnText: "Register Now",
		href: "/register/tournament/all-nations",
		_id: "all-mans-under-6ft",
	},
	{
		title: "All Nations",
		description: "Calling all hoopers",
		imgSrc: "/images/register/joinTeam.jpg",
		imgAlt: "join as a free agent photo",
		btnText: "Register Now",
		href: "/register/tournament/all-mans-under-six-feet",
		_id: "all-nations",
	},
];

export default TournamentSelection;
