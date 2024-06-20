"use client";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";
import React, { useState } from "react";

const JoinTeamCode = ({ teams }) => {
	const [teamCode, setTeamCode] = useState("");
	const [teamCodeError, setTeamCodeError] = useState("");

	const handleJoinTeam = (e) => {
		e.preventDefault();
		const isTeamCodeActive = teams.find((team) => team.teamCode === teamCode);

		if (isTeamCodeActive) {
			const redirectUrl = `/register/join-team/${isTeamCodeActive._id}`;
			window.location.href = redirectUrl; // Simple JavaScript redirection
		} else {
			setTeamCodeError("Code doesn't exist");
		}
	};

	return (
		<div className="mx-auto mb-10 mt-6 w-full rounded border border-neutral-600 p-10 md:mt-20 md:w-1/2">
			<h3 className="font-barlow text-center font-normal uppercase">
				Join a team with a code
			</h3>

			<form
				onSubmit={handleJoinTeam}
				className="mx-auto mt-10 flex flex-col justify-center"
			>
				<Label className="mb-3 hidden uppercase">Team Code</Label>
				<Input
					onChange={(e) => setTeamCode(e.target.value)}
					type="text"
					placeholder="Enter Code"
					className="mx-auto mb-3 border-neutral-600 bg-neutral-700 py-6"
				/>
				<p className="mb-8 flex items-center gap-1 text-sm md:text-xl">
					Got a code to join a team? Enter it above{" "}
					<Dialog>
						<DialogTrigger asChild>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="h-6 w-6 cursor-pointer"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
								/>
							</svg>
						</DialogTrigger>
						<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
							<DialogHeader>
								<DialogTitle>
									Your team captain will have the team code.
								</DialogTitle>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</p>
				<Button>Join Your Team Now</Button>

				{teamCodeError !== "" && (
					<p className="text-primary mt-2">{teamCodeError}</p>
				)}
			</form>
		</div>
	);
};

export default JoinTeamCode;
