import { convertToEST } from "@/utils/convertToEST";
import Link from "next/link";
import { format } from "date-fns";

import React from "react";

const FreeAgentsSuccess = ({ player, user }) => {
	const date = convertToEST(new Date(player?.createdAt));
	const dateFormatted = format(date, "ccc MMM do, uuuu");
	const time = format(date, "h:mm a");
	return (
		<div className="container mx-auto my-20">
			<div className="flex flex-col gap-10 md:flex-row">
				<div className=" w-full md:w-1/2">
					<h1 className="mb-10 text-3xl md:text-5xl">
						Registration Confirmed Successfully 🎉
					</h1>
					<p className="mb-8">
						Your registration for Rise Up Basketball has been confirmed
						successfully. We are thrilled to have you on board for this season!
						Stay tuned for updates, news and more. If you have any questions,
						please don’t hesitate to send an email at
						riseupbballleague@gmail.com
					</p>
					<Link
						className="font-barlow rounded bg-neutral-100 px-12 py-2 font-bold text-neutral-900 transition hover:bg-neutral-200"
						href={`/user/${user._id}`}
					>
						Go to my profile
					</Link>
				</div>
				<div className="w-full border border-neutral-600 p-5 md:w-1/2">
					<h3 className="text-center text-4xl uppercase">Season Details</h3>{" "}
					<ul className="my-5 rounded  p-3 uppercase text-white">
						<li className="my-4 flex justify-between text-lg md:text-2xl">
							<span>Date Registered:</span>{" "}
							<span className="text-right">
								{/* {convertToEST(new Date(player?.createdAt))} */}
								{dateFormatted}
							</span>
						</li>
						<li className="my-4 flex justify-between text-lg md:text-2xl">
							<span>Type of Portal:</span>{" "}
							<span className="text-right">Join As A Free Agent</span>
						</li>
						<li className="my-4 flex justify-between text-lg md:text-2xl">
							<span>Player Name:</span>
							<span>{player?.playerName}</span>
						</li>

						<li className="my-4 flex justify-between text-lg md:text-2xl">
							<span>Season Length:</span>{" "}
							<span className="text-right">
								7 Regular games + 1 guaranteed playoff game
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default FreeAgentsSuccess;
