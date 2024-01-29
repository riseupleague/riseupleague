import TeamLogo from "@/components/general/icons/TeamLogo";
import Link from "next/link";

export default function LeaderCard({ player, rank, currentStat }) {
	return (
		<article className="font-barlow flex justify-between border-b border-neutral-600 bg-neutral-700 px-4 py-2">
			<div className="flex w-1/12 items-center text-sm sm:text-lg">{rank}</div>
			<div className="flex w-2/6 items-center text-sm sm:text-lg">
				<Link
					href={`/players/${player._id}`}
					className="font-barlow text-left text-sm uppercase transition hover:opacity-80 sm:text-lg"
				>
					{player.playerName}
				</Link>
			</div>
			<div className="flex w-2/6 items-center gap-1 text-sm sm:text-lg">
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
					{player.team?.teamName}
				</Link>
			</div>
			<div
				className={`${currentStat === "points" && "text-primary font-bold"} flex w-fit items-center text-sm sm:w-1/12 sm:text-lg`}
			>
				{player.averageStats.points.toFixed(1)}
			</div>
			<div
				className={`${currentStat === "rebounds" && "text-primary font-bold"} flex w-fit items-center text-sm sm:w-1/12 sm:text-lg`}
			>
				{player.averageStats.rebounds.toFixed(1)}
			</div>
			<div
				className={`${currentStat === "assists" && "text-primary font-bold"} flex w-fit items-center text-sm sm:w-1/12 sm:text-lg`}
			>
				{player.averageStats.assists.toFixed(1)}
			</div>
			<div
				className={`${currentStat === "steals" && "text-primary font-bold"} flex w-fit items-center text-sm sm:w-1/12 sm:text-lg`}
			>
				{player.averageStats.steals.toFixed(1)}
			</div>
			<div
				className={`${currentStat === "blocks" && "text-primary font-bold"} flex w-fit items-center text-sm sm:w-1/12 sm:text-lg`}
			>
				{player.averageStats.blocks.toFixed(1)}
			</div>
		</article>
	);
}
