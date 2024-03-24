import Link from "next/link";
import LocationMarker from "../general/icons/LocationMarker";
import TeamLogo from "../general/icons/TeamLogo";
import { Button } from "@ui/components/button";
import { format } from "date-fns";
import { convertToEST } from "@/utils/convertToEST";
import { Badge } from "@ui/components/badge";

const NewScheduleCard = ({ game }): JSX.Element => {
	const gameStatus = game.status ? "summary" : "preview";
	const date = convertToEST(new Date(game.date));
	const dateFormatted = format(date, "ccc MMM do, uuuu");
	const time = format(date, "h:mma");
	const gameDateInSeconds = date.getTime() / 1000;

	const currentDateInSeconds = new Date().getTime() / 1000;

	const differenceInSeconds = currentDateInSeconds - gameDateInSeconds;

	const differenceInHours = differenceInSeconds / 3600;
	const gameIsLive =
		differenceInHours > 0 && differenceInHours < 1 && game.status;
	return (
		<Link
			href={`/games/${gameStatus}/${game._id}`}
			className="relative flex flex-col items-center justify-center rounded border border-neutral-600 py-2 transition-all hover:bg-neutral-700 md:py-[14px]"
		>
			{gameIsLive && (
				<span className="left-[43px] hidden w-fit pt-0 text-base  uppercase text-[#FC0D1B]  underline transition-all  lg:absolute lg:block">
					Live
				</span>
			)}

			<div className="flex w-full items-center px-1 md:gap-2 lg:gap-12 lg:px-0">
				{/* home team */}
				<div className="flex h-full w-1/3 items-center justify-end gap-2 lg:w-[45%]">
					<h6 className="text-center text-xl lg:text-2xl">
						<span className="md:hidden">{game.homeTeam?.teamNameShort}</span>
						<span className="hidden md:block">{game.homeTeam?.teamName}</span>
					</h6>
					<span className="scale-50 md:scale-75">
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
				<div className="flex w-1/3 flex-col items-center justify-center gap-y-1 md:gap-y-3 lg:w-[10%]">
					<Badge variant="schedule" className="mb-2 text-nowrap">
						{game.division.divisionName}
					</Badge>
					{game.status && !gameIsLive ? (
						<p className="text-center text-xs uppercase text-neutral-300 md:text-sm">
							Final
						</p>
					) : (
						<p className="text-center text-xs uppercase text-neutral-300 md:text-sm">
							{dateFormatted}
						</p>
					)}

					{gameStatus === "preview" && (
						<h5 className="font-barlow m-0 text-center text-2xl font-medium md:text-[31px]">
							{time}
						</h5>
					)}

					{gameStatus === "summary" && (
						<h5 className="font-barlow m-0 flex items-center gap-4 text-center text-2xl font-medium md:text-[31px]">
							<span
								className={`${game.homeTeamScore > game.awayTeamScore && "text-primary"}`}
							>
								{game.homeTeamScore}
							</span>{" "}
							<span className="text-sm">vs</span>{" "}
							<span
								className={`${game.homeTeamScore < game.awayTeamScore && "text-primary"}`}
							>
								{game.awayTeamScore}
							</span>
						</h5>
					)}
					<div className="flex items-center gap-1">
						<span className="hidden xl:block">
							<LocationMarker />
						</span>
						<p className="font-barlow text-center text-xs uppercase text-[#82878d] md:text-sm">
							{game.location}
						</p>
					</div>
				</div>

				{/* away team */}
				<div className="relative flex h-full w-1/3 items-center justify-start md:gap-2 lg:w-[45%]">
					<span className="scale-50 md:scale-75">
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
					<h6 className="max-w-[180px] text-center text-xl lg:text-2xl">
						<span className="md:hidden">{game.awayTeam?.teamNameShort}</span>
						<span className="hidden md:block">{game.awayTeam?.teamName}</span>
					</h6>
				</div>
			</div>
			{!gameIsLive && (
				<span
					// href={`/games/${gameStatus}/${game._id}`}
					className="right-[43px] hidden w-fit pt-0 text-base uppercase text-neutral-300 underline transition-all hover:text-neutral-200 lg:absolute lg:block"
				>
					{gameStatus}
				</span>
			)}
		</Link>
	);
};

export default NewScheduleCard;
