import TeamLogo from "@/components/general/icons/TeamLogo";
import Link from "next/link";

export default function PlayerCard({ player }) {
	return (
		<article className="font-barlow flex justify-between border-b border-neutral-600 bg-neutral-700 px-4 py-2 ">
			<div className="grid w-3/4 grid-cols-2 items-center gap-1">
				<div className="flex  flex-row items-center gap-2 text-start ">
					<TeamLogo
						primary={player.team?.primaryColor || ""}
						secondary={player.team?.secondaryColor || ""}
						tertiary={player.team?.tertiaryColor || ""}
						width={15}
						height={14}
						circleHeight={1.3}
						circleWidth={1.3}
					/>
					<Link
						href={`/players/${player._id}`}
						className="font-barlow text-left text-sm uppercase transition hover:opacity-80 sm:text-lg"
					>
						{player.playerName}
					</Link>
				</div>
				<Link
					href={`/teams/${player.team?._id}`}
					className="font-barlow w-fit text-left text-sm uppercase transition hover:opacity-80 sm:text-lg"
				>
					{player.team?.teamName}
				</Link>
			</div>
			<div className="grid w-1/4 grid-cols-2 items-center justify-items-center gap-4">
				<p className="text-center text-sm sm:text-lg">{player.jerseyNumber}</p>
				<p className="font-barlow text-center text-sm uppercase transition hover:opacity-80 sm:text-lg">
					{player.division?.divisionName}
				</p>
			</div>
		</article>
	);
}
