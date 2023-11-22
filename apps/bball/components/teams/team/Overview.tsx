"use client";

import ScheduleCard from "@/components/games/ScheduleCard";
import FeaturedPlayerCard from "@/components/general/FeaturedPlayerCard";

const Overview = ({ team, upcomingGames }) => {
	return (
		<div>
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
					Players
				</h2>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{team?.players.map((player, index) => {
						return <FeaturedPlayerCard player={player} key={index} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default Overview;
