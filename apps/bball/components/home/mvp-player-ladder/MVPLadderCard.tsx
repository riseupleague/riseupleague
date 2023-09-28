import { Card } from "@ui/components/card";
import MVPLadderImgPlaceholder from "../../general/icons/MVPLadderImgPlaceholder";
import MVPUpIcon from "../../general/icons/MVPUpIcon";
import MVPDownIcon from "../../general/icons/MVPDownIcon";
import Link from "next/link";

export default function MVPLadderCard({ player, index }) {
	return (
		<Card className="flex justify-between px-4 py-3">
			<div className="flex items-center gap-3">
				<MVPLadderImgPlaceholder />
				<div>
					<p className="text-neutral-350 font-medium">
						team | #{player.jerseyNumber}
					</p>
					<Link
						href={`/players/${player._id}`}
						className="text-2xl uppercase transition hover:opacity-80"
					>
						{player.playerName}
					</Link>
				</div>
			</div>
			<div className="flex items-center">
				{index % 2 ? <MVPDownIcon /> : <MVPUpIcon />}
			</div>
		</Card>
	);
}
