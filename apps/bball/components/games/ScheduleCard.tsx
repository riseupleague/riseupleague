import Link from "next/link";
import LocationMarker from "../general/icons/LocationMarker";
import TeamLogo from "../general/icons/TeamLogo";
import { Button } from "@ui/components/button";
import { format } from "date-fns";
import { convertToEST } from "@/utils/convertToEST";

export default function ScheduleCard({ game }) {
	const gameStatus = game.status ? "summary" : "preview";

	const date = convertToEST(new Date(game.date));
	const dateFormatted = format(date, "ccc MMM do, uuuu");
	const time = format(date, "h:mm a");

	return (
		<article className="flex flex-col rounded border border-neutral-600 bg-neutral-700">
			<div className="flex-1">
				<div className="grid grid-cols-3">
					{/* home team */}
					<Link
						href={`/teams/${game.homeTeam?._id}`}
						className="flex flex-col items-center gap-[10px] p-4"
					>
						<TeamLogo
							primary={game.homeTeam?.primaryColor || ""}
							secondary={game.homeTeam?.secondaryColor || ""}
							tertiary={game.homeTeam?.tertiaryColor || ""}
							width={45}
							height={44}
							circleHeight={4}
							circleWidth={4}
						/>
						<span className="font-barlow flex items-center justify-center text-center align-middle text-sm transition hover:opacity-80 lg:h-10">
							{game.homeTeam?.teamName || "Empty"}
						</span>
						{game.status && (
							<p
								className={`text-3xl ${
									game.homeTeamScore > game.awayTeamScore ? "text-primary" : ""
								}`}
							>
								{game.homeTeamScore}
							</p>
						)}
					</Link>

					{/* division / time / location */}
					<div className="font-barlow flex flex-col justify-center py-4 text-center uppercase">
						<div className="mb-4 flex justify-center">
							<p className="w-fit rounded bg-neutral-600 px-2 py-1 text-center text-xs">
								{game.division.divisionName}
							</p>
						</div>
						<p className="my-2 text-xs text-neutral-400">{dateFormatted}</p>
						<p className="mb-3 text-xl xl:text-[31px]">
							{game.status ? "Final" : time}
						</p>
					</div>

					{/* away team */}
					<Link
						href={`/teams/${game.awayTeam?._id}`}
						className="flex flex-col items-center gap-[10px] p-4"
					>
						<TeamLogo
							primary={game.awayTeam?.primaryColor}
							secondary={game.awayTeam?.secondaryColor}
							tertiary={game.awayTeam?.tertiaryColor}
							width={45}
							height={44}
							circleHeight={4}
							circleWidth={4}
						/>
						<span className="font-barlow flex items-center justify-center text-center align-middle text-sm transition hover:opacity-80 lg:h-10">
							{game.awayTeam?.teamName || "Empty"}
						</span>
						{game.status && (
							<p
								className={`text-3xl ${
									game.awayTeamScore > game.homeTeamScore ? "text-primary" : ""
								}`}
							>
								{game.awayTeamScore}
							</p>
						)}
					</Link>
				</div>
				<div className="font-barlow mb-3 flex items-center justify-center gap-1 text-lg">
					<div className="translate-y-[1px]">
						<LocationMarker />
					</div>
					<p className="text-sm text-neutral-400">{game.location}</p>
				</div>
			</div>

			{/* preview/summary button */}
			<div className="flex p-4">
				<Link href={`/games/${gameStatus}/${game._id}`} className="w-full">
					<Button className="w-full capitalize">{gameStatus}</Button>
				</Link>
			</div>
		</article>
	);
}
