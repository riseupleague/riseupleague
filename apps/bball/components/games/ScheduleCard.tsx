import Link from "next/link";
import LocationMarker from "../general/icons/LocationMarker";
import HomeImgPlaceholder from "../general/icons/HomeImgPlaceholder";
import TeamLogo from "../general/icons/TeamLogo";
import { Button } from "@ui/components/button";

export default function ScheduleCard({ game }) {
	const gameStatus = game.status ? "summary" : "preview";

	const isoDate = game.date;

	const date = new Date(isoDate);

	const time = date
		.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		})
		.replace(/\u202f/, " ");

	return (
		<article className="flex flex-col rounded border border-neutral-600 bg-neutral-700">
			<div className="grid grid-cols-3">
				{/* home team */}
				<Link
					href={`/teams/${game.homeTeam._id}`}
					className="flex flex-col gap-[10px] p-4"
				>
					<TeamLogo
						primary={game.homeTeam.primaryColor}
						secondary={game.homeTeam.secondaryColor}
						tertiary={game.homeTeam.tertiaryColor}
						width={45}
						height={44}
						circleHeight={4}
						circleWidth={4}
					/>
					<span className="font-barlow text-sm transition hover:opacity-80 lg:text-lg">
						{game.homeTeam.teamName}
					</span>
				</Link>

				{/* division / time / location */}
				<div className="font-barlow  flex flex-col justify-center py-4 text-center uppercase">
					<div className="mb-[35px] flex justify-center">
						<p className="w-fit rounded bg-neutral-600 px-4 py-1 text-center text-[10px]">
							{game.division.divisionName}
						</p>
					</div>
					<p className="mb-3 text-[31px]">{time}</p>
				</div>

				{/* away team */}
				<div className="flex flex-col items-end gap-[10px] p-4">
					<TeamLogo
						primary={game.awayTeam.primaryColor}
						secondary={game.awayTeam.secondaryColor}
						tertiary={game.awayTeam.tertiaryColor}
						width={45}
						height={44}
						circleHeight={4}
						circleWidth={4}
					/>
					<Link
						href={`/teams/${game.awayTeam?._id}`}
						className="font-barlow text-right text-sm transition hover:opacity-80 lg:text-lg"
					>
						{game.awayTeam?.teamName}
					</Link>
				</div>
			</div>
			<div className="font-barlow mb-3 flex items-center justify-center gap-1 text-lg">
				<div className="translate-y-[1px]">
					<LocationMarker />
				</div>
				<p className="text-neutral-400">{game.location}</p>
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