import TeamLogo from "@/components/general/icons/TeamLogo";
import Link from "next/link";

const MVPCard = ({ player, rank, mvpScore }): JSX.Element => {
	// remove any names with a number in it
	let regex = /^[a-zA-Z0-9-_]+$/;
	let nameArray = player.playerName.split(" ");
	nameArray = nameArray.filter((name) => regex.test(name));

	return (
		<article className="font-barlow flex justify-between border-b border-neutral-600 bg-neutral-700 px-4 py-2 sm:pr-6">
			<div className="flex w-2 items-center text-sm sm:text-lg">{rank}</div>
			<div className="flex w-1/6 items-center text-sm sm:text-lg">
				<Link
					href={`/players/${player._id}`}
					className="font-barlow text-left text-sm uppercase transition hover:opacity-80 sm:text-lg"
				>
					<span className="block sm:hidden">
						{nameArray[0]} {nameArray[1] && <span>{nameArray[1][0]}.</span>}
					</span>
					<span className="hidden sm:block">{player.playerName}</span>
				</Link>
			</div>
			<div className="flex w-1/6 items-center gap-1 text-sm sm:text-lg">
				<span className="hidden sm:block">
					<TeamLogo
						primary={player.team?.primaryColor || ""}
						secondary={player.team?.secondaryColor || ""}
						tertiary={player.team?.tertiaryColor || ""}
						width={15}
						height={14}
						circleHeight={1.3}
						circleWidth={1.3}
					/>
				</span>
				<Link
					href={`/teams/${player.team?._id}`}
					className="font-barlow w-fit text-left text-sm uppercase transition hover:opacity-80 sm:text-lg"
				>
					<span className="block sm:hidden">{player.team?.teamNameShort}</span>
					<span className="hidden sm:block">{player.team?.teamName}</span>
				</Link>
			</div>
			<div className="flex w-fit items-center text-sm sm:w-6 sm:text-lg">
				{player.averageStats.points.toFixed(1)}
			</div>
			<div className="flex w-fit items-center text-sm sm:w-6 sm:text-lg">
				{player.averageStats.rebounds.toFixed(1)}
			</div>
			<div className="flex w-fit items-center text-sm sm:w-6 sm:text-lg">
				{player.averageStats.assists.toFixed(1)}
			</div>
			<div className="flex w-fit items-center text-sm sm:w-6 sm:text-lg">
				{player.averageStats.steals.toFixed(1)}
			</div>
			<div className="flex w-fit items-center text-sm sm:w-6 sm:text-lg">
				{player.averageStats.blocks.toFixed(1)}
			</div>
			<div className="text-primary flex w-fit items-center text-sm font-bold sm:w-6 sm:text-lg">
				{mvpScore.toFixed(1)}
			</div>
		</article>
	);
};

export default MVPCard;
