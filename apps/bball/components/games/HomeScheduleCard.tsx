import Link from "next/link";
import TeamLogo from "../general/icons/TeamLogo";
import { format } from "date-fns";
import { convertToEST } from "@/utils/convertToEST";
import { Badge } from "@ui/components/badge";
import { IoLocationOutline } from "react-icons/io5";
import { utcToZonedTime } from "date-fns-tz";

const HomeScheduleCard = ({ game }): JSX.Element => {
	const gameStatus = game.status ? "summary" : "preview";

	let date;
	let dateFormatted;
	let time;
	let gameDateInSeconds;
	if (game.division._id === "660d6a75ab30a11b292cd290") {
		// utc dates
		date = new Date(game.date);
		const utcDate = utcToZonedTime(date, "UTC");
		dateFormatted = format(utcDate, "ccc MMM do, uuuu");
		time = format(utcDate, "h:mm a");
		gameDateInSeconds = utcDate.getTime() / 1000;
		// utc dates
	} else {
		// convert to toronto dates
		date = convertToEST(new Date(game.date));
		dateFormatted = format(date, "ccc MMM do, uuuu");
		time = format(date, "h:mm a");
		gameDateInSeconds = date.getTime() / 1000;
		// convert to toronto dates
	}

	if (time.endsWith(":59PM") || time.endsWith(":59AM")) {
		// If the time is 7:59 PM or 7:59 AM, round it up to the next hour
		time = (parseInt(time) + 1).toString() + ":00 PM";
	}

	const currentDateInSeconds = new Date().getTime() / 1000;

	const differenceInSeconds = currentDateInSeconds - gameDateInSeconds;

	const differenceInHours = differenceInSeconds / 3600;
	const gameIsLive =
		differenceInHours > 0 && differenceInHours < 1 && game.status;
	return (
		<div className="rounded border border-neutral-600 px-4 py-2 transition-all hover:bg-neutral-700 md:py-[14px]">
			<Link
				href={`/games/${gameStatus}/${game._id}`}
				className="relative flex flex-col items-center justify-center  "
			>
				<div className="flex w-full items-center px-1 md:gap-2 lg:gap-12 lg:px-0">
					{/* home team */}
					<div className="flex h-full w-1/3 items-center justify-start gap-2 lg:w-[45%]">
						<h6 className="font-akira text-center text-xs lg:text-lg">
							<span className="lg:hidden">{game.homeTeam?.teamNameShort}</span>
							<span className="hidden lg:block">{game.homeTeam?.teamName}</span>
						</h6>
						<span className="scale-50 md:scale-75"></span>
					</div>

					{/* game info */}
					<div className="flex w-1/3 flex-col items-center justify-center">
						<Badge variant="schedule" className="mb-2 text-nowrap">
							{game.division.divisionName}
						</Badge>

						<p className="mb-2 text-center text-xs capitalize text-neutral-300 md:text-sm">
							{game.status && !gameIsLive ? "Final" : dateFormatted}
						</p>

						{gameStatus === "preview" && (
							<h5 className="font-akira m-0 text-center text-lg">{time}</h5>
						)}
					</div>

					{/* away team */}
					<div className="relative flex h-full w-1/3 items-center justify-end md:gap-2 lg:w-[45%]">
						<span className="scale-50 md:scale-75"></span>
						<h6 className="font-akira max-w-[180px] text-left text-xs lg:text-lg">
							<span className="lg:hidden">{game.awayTeam?.teamNameShort}</span>
							<span className="hidden lg:block">{game.awayTeam?.teamName}</span>
						</h6>
					</div>
				</div>
			</Link>

			<Link
				href={`https://www.google.com/maps/search/?api=1&query=${game.location}`}
				target="_blank"
				className="hover:text-primary mx-auto mt-2 flex w-fit items-center justify-center  gap-1 text-center text-[#82878d]"
			>
				<span>
					<IoLocationOutline />
				</span>
				<p className="font-inter text-center text-sm">{game.location}</p>
			</Link>
		</div>
	);
};

export default HomeScheduleCard;
