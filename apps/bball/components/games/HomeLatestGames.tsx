import ScheduleCard from "./ScheduleCard";

const HomeLatestGames = ({ games }): JSX.Element => {
	return (
		// <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		<div className="flex flex-col gap-4">
			{games
				?.reverse()
				.map((game, index) => <ScheduleCard game={game} key={index} />)}
		</div>
	);
};

export default HomeLatestGames;
