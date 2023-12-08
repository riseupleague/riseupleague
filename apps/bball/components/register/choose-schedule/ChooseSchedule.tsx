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

export default function ChooseSchedule({ team, user }) {
	const divisionTeams = team.division.teams;
	const scheduleAvailable = divisionTeams < 6 ? false : true;
	// const scheduleAvailable = true;

	const teamCaptain = team.players.filter((player) => player.teamCaptain)[0];
	const isTeamCaptain = user._id === teamCaptain.user;
	// const isTeamCaptain = true;

	const otherTeams = divisionTeams.filter(
		(otherTeam) => otherTeam !== team._id
	);

	console.log(team.division);

	// this is a placeholder, use actual db times later
	const weekTimes = [
		{
			startTime: "1:30pm",
			endTime: "2:30pm",
		},
		{
			startTime: "2:30pm",
			endTime: "3:30pm",
		},
		{
			startTime: "3:30pm",
			endTime: "4:30pm",
		},
		{
			startTime: "4:30pm",
			endTime: "5:30pm",
		},
	];

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
												Team #{index}
												<pre>{team}</pre>
											</article>
										))}
									</div>
								</AlertDescription>
							</Alert>

							{team.division.teams.map((week, index) => (
								<article key={index} className="my-10">
									<h4>Week {index + 1}</h4>

									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
										{weekTimes.map((day, idx) => (
											<Dialog key={idx}>
												<Button
													asChild
													className="flex flex-col gap-2 text-neutral-900"
												>
													<DialogTrigger>
														<p className="text-2xl">
															{day.startTime} - {day.endTime}
														</p>
														<p className="text-base font-medium">
															?/2 slots filled
														</p>
														<span className="font-medium">? vs ?</span>
													</DialogTrigger>
												</Button>
												<DialogContent className="rounded border-neutral-400 bg-neutral-900">
													<DialogHeader>
														<DialogTitle>
															<h4>
																Week {index + 1}: {day.startTime} -{" "}
																{day.endTime} @ {team.division.location}
															</h4>
														</DialogTitle>
														<DialogDescription>
															<p className="text-lg">
																Select an available slot.
															</p>
														</DialogDescription>
													</DialogHeader>

													<Separator className="border border-neutral-500" />

													<div className="flex flex-col gap-4">
														<p>Home Team:</p>
														<Button className="font-medium">Available</Button>
														<p>Away Team:</p>
														<Button className="disabled:bg-secondary font-medium disabled:cursor-not-allowed disabled:text-neutral-300">
															Available
														</Button>
													</div>
												</DialogContent>
											</Dialog>
										))}
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
