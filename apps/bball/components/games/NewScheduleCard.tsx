import Link from "next/link";
import LocationMarker from "../general/icons/LocationMarker";
import TeamLogo from "../general/icons/TeamLogo";
import { Button } from "@ui/components/button";
import { format } from "date-fns";
import { convertToEST } from "@/utils/convertToEST";
import { Badge } from "@ui/components/badge";

const NewScheduleCard = ({ game }): JSX.Element => {
	console.log(game);

	const gameStatus = game.status ? "summary" : "preview";

	const date = convertToEST(new Date(game.date));
	const dateFormatted = format(date, "ccc MMM do, uuuu");
	const time = format(date, "h:mma");

	return (
		<article className="relative flex flex-col items-center justify-center rounded border border-neutral-600 py-[14px]">
			<div className="flex w-full items-center gap-2 px-1 lg:gap-12 lg:px-0">
				{/* home team */}
				<div className="flex h-full w-1/3 flex-col items-center justify-end gap-2 lg:w-[45%] lg:flex-row">
					<h6 className="text-center lg:text-2xl">{game.homeTeam.teamName}</h6>
					<span className="scale-75">
						<TeamLogo
							primary={game.homeTeam?.primaryColor || ""}
							secondary={game.homeTeam?.secondaryColor || ""}
							tertiary={game.homeTeam?.tertiaryColor || ""}
							width={40}
							height={40}
							circleHeight={4}
							circleWidth={4}
						/>
					</span>
				</div>

				{/* game info */}
				<div className="flex w-1/3 flex-col items-center justify-center gap-y-3 lg:w-[10%]">
					<Badge variant="schedule">{game.division.divisionName}</Badge>
					<p className="text-center text-sm uppercase text-neutral-300">
						{dateFormatted}
					</p>
					<h5 className="font-barlow m-0 text-center text-[31px] font-medium">
						{time}
					</h5>
					<div className="flex items-center gap-1">
						<span className="hidden xl:block">
							<LocationMarker />
						</span>
						<p className="font-barlow text-center text-sm uppercase text-[#82878d]">
							{game.location}
						</p>
					</div>
				</div>

				{/* away team */}
				<div className="relative flex h-full w-1/3 flex-col-reverse items-center justify-start gap-2 lg:w-[45%] lg:flex-row">
					<span className="scale-75">
						<TeamLogo
							primary={game.awayTeam?.primaryColor || ""}
							secondary={game.awayTeam?.secondaryColor || ""}
							tertiary={game.awayTeam?.tertiaryColor || ""}
							width={40}
							height={40}
							circleHeight={4}
							circleWidth={4}
						/>
					</span>
					<h6 className="max-w-[180px] text-center lg:text-2xl">
						{game.awayTeam.teamName}
					</h6>
				</div>
			</div>

			<Link
				href={`/games/${gameStatus}/${game._id}`}
				className="w-fit pt-8 text-base uppercase text-neutral-300 underline transition-all hover:text-neutral-200 lg:absolute lg:right-[43px] lg:pt-0"
			>
				{gameStatus}
			</Link>
		</article>
	);
};

export default NewScheduleCard;
