import { Button } from "@ui/components/button";
import Image from "next/image";
import React from "react";

const TournamentHero = () => {
	return (
		<div className="relative h-[500px] lg:h-[750px] xl:h-[1000px]">
			<div className="absolute inset-0">
				<Image
					src="/images/tournament/tournament-of-power-banner.jpg"
					alt="create a team image"
					className="h-full w-full object-cover object-center"
					fill
				/>
				<div className="absolute inset-0 bg-black opacity-75"></div>
			</div>
			<div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
				<div className="relative h-[100px] w-[200px] lg:h-[200px] lg:w-[500px]">
					<Image
						src="/images/tournament/tournament-of-power-logo.png"
						alt="tournament of power logo"
						fill
						className="object-contain object-center"
					/>
				</div>
				<h2 className="mb-4 mt-10 flex flex-col gap-3 text-xl font-bold leading-tight lg:gap-5 lg:text-5xl">
					<p className="text-xl lg:text-5xl">Date: August 9-11, 2024</p>
					<p className="text-xl lg:text-5xl">
						LOCATION 1: SHERIDAN DAVIS CAMPUS - BEGINNER AND INTERMEDIATE
					</p>
					<p className="text-xl lg:text-5xl">
						LOCATION 2: GAME6 ACADEMY - ADVANCED AND ELITE
					</p>
				</h2>
				<Button className="bg-primary mt-5 text-white" variant="default">
					Register Now
				</Button>
			</div>
		</div>
	);
};

export default TournamentHero;
