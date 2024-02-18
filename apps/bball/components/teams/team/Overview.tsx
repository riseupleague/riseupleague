"use client";

import ScheduleCard from "@/components/games/ScheduleCard";
import FeaturedPlayerCard from "@/components/general/FeaturedPlayerCard";
import dynamic from "next/dynamic";

const Overview = ({ team, upcomingGames }): JSX.Element => {
	const jerseyEdition = team?.jerseyEdition;
	let edition;
	if (jerseyEdition) edition = jerseyEdition.split("-")[0];

	// Dynamic import of the component
	const DynamicComponent = dynamic(
		() => import(`@/lib/jersey-designs/${edition}/${jerseyEdition}`),
		{
			loading: () => <p>Loading...</p>, // Component to show while loading
			ssr: false, // Set to false if you want to disable server-side rendering for this component
		}
	);

	return (
		<div>
			<div>
				<h2 className="font-barlow my-8 text-center text-4xl uppercase">
					Jersey Design
				</h2>
				{jerseyEdition && jerseyEdition !== "" ? (
					<div className=" mx-auto w-full border-neutral-600 bg-neutral-700 lg:w-1/2">
						<style id="styleElement">
							{`.primaryColorFill {
								  			fill: ${team.primaryColor} !important;
											}
								.primaryColorStroke {
									stroke: ${team.primaryColor} !important;
								  }
								  .tertiaryColorFill {
									fill: ${team.tertiaryColor} !important;
								  }
								  .tertiaryColorStroke {
									stroke: ${team.tertiaryColor} !important;
								  }
					
								  .secondaryColorFill {
									fill: ${team.secondaryColor} !important;
								  }
					
								  .secondaryColorStroke {
									stroke: ${team.secondaryColor} !important;
								  }

								  .jerseyDiv {
									background-color: rgb(17 22 29 / var(--tw-bg-opacity));
								  }
							
								`}
						</style>
						<div className="flex flex-col">
							<DynamicComponent />
						</div>
					</div>
				) : (
					<h6 className="text-primary text-center">
						no jersey designed at this moment, please come back again at a later
						time.
					</h6>
				)}
			</div>
			{/* upcoming games grid */}
			<div>
				<h2 className="font-barlow my-8 text-center text-4xl uppercase">
					upcoming games
				</h2>
				{upcomingGames.length !== 0 ? (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{upcomingGames?.map((game, index) => {
							return <ScheduleCard game={game} key={index} />;
						})}
					</div>
				) : (
					<h6 className="text-primary text-center">
						no games scheduled at this moment, please come back again at a later
						time.
					</h6>
				)}
			</div>
			{/* players grid */}
			<div>
				<h2 className="font-barlow my-8 text-center text-4xl uppercase">
					Roster
				</h2>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{team?.players.map((player, index) => {
						return <FeaturedPlayerCard player={player} key={index} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default Overview;
