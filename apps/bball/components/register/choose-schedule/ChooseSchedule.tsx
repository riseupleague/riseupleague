"use client";

import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Alert, AlertDescription, AlertTitle } from "@ui/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/ui/dialog";
import Link from "next/link";
import { reserveSlot } from "@/actions/reserveSlot";
import { useFormState, useFormStatus } from "react-dom";

export default function ChooseSchedule({ team, user }) {
	const { pending } = useFormStatus();

	const divisionTeams = team.division.teams;
	const schedule = team.division.teamSchedule;
	const scheduleAvailable = divisionTeams < 6 ? false : true;
	// const scheduleAvailable = true;

	// const bindSlotData = reserveSlot.bind(null, , id);
	const [state, formAction] = useFormState(reserveSlot, null);

	const teamCaptain = team.players.filter((player) => player.teamCaptain)[0];
	// const isTeamCaptain = user._id === teamCaptain.user;
	const isTeamCaptain = true;

	const slot1Hours = Number(team.division.startTime.slice(0, 2));
	const slot1Minutes = Number(team.division.startTime.slice(3, 5));

	const otherTeams = divisionTeams.filter(
		(otherTeam) => otherTeam !== team._id
	);

	const handleReserveSlot = async (e, teamType) => {
		reserveSlot(e, teamType);
	};

	return (
		<div className="font-barlow">
			<h3 className="text-center">Division: {team.division.divisionName}</h3>
			<h6 className="my-2 text-center">
				{team.division.day} @ {team.division.location} from{" "}
				{team.division.startTime} - {team.division.endTime}
			</h6>

			<Separator className="my-3 border border-neutral-500 sm:my-12" />
			{scheduleAvailable ? (
				// if division has 6 teams or more
				<>
					{isTeamCaptain ? (
						// show schedule for team captain
						<>
							<p className="my-4 text-lg">
								Every team must play every other team once.
							</p>

							<Alert variant="destructive" className="border-primary">
								<div className="flex items-center gap-2">
									<AlertCircle />
									<AlertTitle>
										Since you were not the first team to select your schedule
										times, you must play the following team(s):
									</AlertTitle>
								</div>

								<Separator className="mt-4 border border-neutral-500" />

								<AlertDescription>
									<div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
										{otherTeams.map((team, index) => (
											<article key={index} className="text-lg">
												Team #{index + 1}
												<pre>{team}</pre>
											</article>
										))}
									</div>
								</AlertDescription>
							</Alert>

							{schedule.map((week, index) => (
								<article key={index} className="my-10">
									<h4>Week {index + 1}</h4>

									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
										{week.map((slot, idx) => {
											let slotCounter = 0;

											if (slot.homeTeam !== null) slotCounter++;
											if (slot.awayTeam !== null) slotCounter++;

											return (
												<Dialog key={idx}>
													<Button
														asChild
														className="flex flex-col gap-2 text-neutral-900"
													>
														<DialogTrigger>
															<p className="text-2xl">
																{slot1Hours + idx}:{slot1Minutes} -{" "}
																{slot1Hours + idx + 1}:{slot1Minutes}
															</p>
															<p className="text-base font-medium">
																{slotCounter}/2 slots filled
															</p>
															<span className="font-medium">
																{slot.homeTeam || "?"} vs {slot.awayTeam || "?"}
															</span>
														</DialogTrigger>
													</Button>
													<DialogContent className="rounded border-neutral-400 bg-neutral-900">
														<DialogHeader>
															<DialogTitle>
																<h4>
																	{slot1Hours + idx}:{slot1Minutes} -{" "}
																	{slot1Hours + idx + 1}:{slot1Minutes}
																</h4>
															</DialogTitle>
															<DialogDescription>
																<p className="text-lg">
																	Select an available slot.
																</p>
															</DialogDescription>
														</DialogHeader>

														<Separator className="border border-neutral-500" />

														<p>Home Team:</p>
														<Button
															onClick={() => handleReserveSlot(slot, "home")}
															className="disabled:bg-secondary font-medium disabled:cursor-not-allowed disabled:text-neutral-300"
														>
															Available
														</Button>
														<p>Away Team:</p>
														<Button
															onClick={() => handleReserveSlot(slot, "away")}
															type="submit"
															className="disabled:bg-secondary font-medium disabled:cursor-not-allowed disabled:text-neutral-300"
														>
															Available
														</Button>
													</DialogContent>
												</Dialog>
											);
										})}
									</div>
								</article>
							))}
						</>
					) : (
						// tell user that the schedule is only available for team captain
						<div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center gap-4 text-center">
							<h3 className="text-primary">
								Your schedule is available, but only the team captain may select
								the team schedule.
							</h3>
							<h4>
								Your team captain is:{" "}
								<span className="text-primary">{teamCaptain.playerName}</span>{" "}
							</h4>
							<div className="flex gap-4">
								<Button variant="default">
									<Link
										href="https://www.instagram.com/riseup.bball/"
										target="_blank"
									>
										Rise Up Instagram
									</Link>
								</Button>
								<Button variant="default">
									<Link href="/">Back to Homepage</Link>
								</Button>
							</div>
						</div>
					)}
				</>
			) : (
				// division has less than 6 teams, show different messaging
				<div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center gap-4 text-center">
					<h3 className="text-primary ">
						This division must have at least 6 teams in order for you to choose
						your schedule.
					</h3>
					<h4>Follow our Instagram for division updates!</h4>
					<div className="flex gap-4">
						<Button variant="default">
							<Link
								href="https://www.instagram.com/riseup.bball/"
								target="_blank"
							>
								Instagram
							</Link>
						</Button>
						<Button variant="default">
							<Link href="/">Back to Homepage</Link>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
