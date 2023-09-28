import Link from "next/link";
import LocationMarker from "../general/icons/LocationMarker";
import HomeImgPlaceholder from "../general/icons/HomeImgPlaceholder";
import AwayImgPlaceholder from "../general/icons/AwayImgPlaceholder";
import { Button } from "@ui/components/button";

export default function ScheduleCard({ game }) {
	const gameStatus = game.status ? "summary" : "preview";

	return (
		<article className="flex flex-col rounded border border-neutral-600 bg-neutral-700">
			<div className="grid grid-cols-3">
				{/* home team */}
				<div className="flex flex-col gap-[10px] p-4">
					<HomeImgPlaceholder />
					<Link
						href={`/teams/${game.homeTeam._id}`}
						className="font-barlow text-sm transition hover:opacity-80 lg:text-lg"
					>
						{game.homeTeam.teamName}
					</Link>
				</div>

				{/* division / time / location */}
				<div className="font-barlow  flex flex-col justify-center p-4 text-center uppercase">
					<div className="mb-[35px] flex justify-center">
						<p className="w-fit rounded bg-neutral-600 px-4 py-1 text-center text-[10px]">
							div
						</p>
					</div>
					<p className="mb-3 text-[31px]">time</p>
					<div className="flex items-center justify-center gap-1">
						<div className="translate-y-[1px]">
							<LocationMarker />
						</div>
						<p className="text-neutral-400">location</p>
					</div>
				</div>

				{/* away team */}
				<div className="flex flex-col items-end gap-[10px] p-4">
					<AwayImgPlaceholder />
					<Link
						href={`/teams/${game.awayTeam?._id}`}
						className="font-barlow text-right text-sm transition hover:opacity-80 lg:text-lg"
					>
						{game.awayTeam?.teamName}
					</Link>
				</div>
			</div>

			{/* preview/summary button */}
			<div className="flex p-4">
				<Link href={`/games/preview/${game._id}`} className="w-full">
					<Button className="w-full capitalize">{gameStatus}</Button>
				</Link>
			</div>
		</article>
	);
}
