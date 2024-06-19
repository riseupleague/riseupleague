import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/ui/table";
import Link from "next/link";
import { convertToEST } from "@/utils/convertToEST";
import { format } from "date-fns";
import { Separator } from "@ui/components/separator";
import { Button } from "@ui/components/button";

const UserPlayerGames = ({ games }) => {
	return (
		<div>
			{games.length === 0 && (
				<div className="flex w-full flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px] lg:w-1/2">
					<div>
						<h3 className=" text-2xl font-semibold uppercase ">
							Team Schedule
						</h3>
						<Separator
							orientation="horizontal"
							className="mb-3 mt-1 bg-white"
						/>{" "}
						<p>You decide on what time your team will play in. </p>{" "}
					</div>
					<Button
						asChild
						disabled
						className="font-barlow mt-16 rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
					>
						<Link href="/choose-team-schedule">Select Dates</Link>
					</Button>
				</div>
			)}
			{games.length > 0 && (
				<Table className="font-barlow">
					<TableHeader>
						<TableRow className="md:text-md h-10 border-b-neutral-500 text-sm uppercase md:text-lg">
							<TableHead className="w-1/3 p-1 text-left sm:w-1/6">
								Game
							</TableHead>
							<TableHead className="w-1/3 p-1 text-sm md:text-lg">
								Date & Time
							</TableHead>

							<TableHead className="w-1/3 p-1 text-sm md:text-lg">
								Location
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{games?.map((game, index) => {
							let date;
							let formattedDate;

							if (game.division === "660d6a75ab30a11b292cd290") {
								// utc dates
								date = new Date(game.date);
								const utcDate = utcToZonedTime(date, "UTC");
								formattedDate = format(utcDate, "E L/d @ h:mm a");
								// utc dates
							} else {
								// convert to toronto dates

								date = convertToEST(new Date(game.date));
								formattedDate = format(date, "E L/d @ h:mm a");
								// convert to toronto dates
							}

							return (
								<TableRow
									key={index}
									className="h-10 border-b-neutral-500 text-sm md:text-lg"
								>
									<TableCell className="w-1/3 p-1 text-left sm:w-1/12">
										<Link
											href={`/games/preview/${game?._id}`}
											className="transition-all hover:underline"
										>
											{game?.gameName}
										</Link>
									</TableCell>
									<TableCell className="w-1/3 p-1">{formattedDate}</TableCell>
									<TableCell className="w-1/3 p-1">{game.location}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			)}
		</div>
	);
};

export default UserPlayerGames;
