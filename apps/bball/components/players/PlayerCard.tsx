import LogoPlaceholder from "@/components/general/icons/LogoPlaceholder";
import Link from "next/link";

export default function PlayerCard({ player }) {
	return (
		<article className="font-barlow flex justify-between border border-neutral-600 bg-neutral-700 px-4 py-2 lg:rounded">
			<div className="grid w-3/4 grid-cols-2 items-center gap-1">
				<div className="flex items-center gap-2">
					<LogoPlaceholder />
					<Link
						href={`/players/${player._id}`}
						className="font-barlow uppercase"
					>
						{player.playerName}
					</Link>
				</div>
				<p className="flex text-sm">{player.team.teamName}</p>
			</div>
			<div className="grid w-1/4 grid-cols-2 items-center justify-items-center gap-4">
				<p className="text-sm">{player.jerseyNumber}</p>
				<p className="text-sm">{player.division.divisionName}</p>
			</div>
		</article>
	);
}
