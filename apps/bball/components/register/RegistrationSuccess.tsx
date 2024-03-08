import Link from "next/link";
import React from "react";

const RegistrationSuccess = ({ team }) => {
	const convertToAMPM = (timeString) => {
		let formattedTime;
		if (timeString) {
			const [hours, minutes] = timeString.split(":");
			const date = new Date(2023, 0, 1, hours, minutes); // Assuming year 2023, month 0 (January), day 1

			// Format the time to AM/PM
			formattedTime = date.toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "numeric",
				hour12: true,
			});
		}

		return formattedTime;
	};

	// Example usage:
	const startTimeAMPM = convertToAMPM(team.division?.startTime);
	const endTimeAMPM = convertToAMPM(team.division?.endTime);
	return (
		<div className="flex flex-col gap-10 md:flex-row">
			<div className=" w-full md:w-1/2">
				<h1 className="mb-10 text-3xl md:text-5xl">
					Registration Confirmed Successfully 🎉
				</h1>
				<p className="mb-4">
					Your registration for Rise Up Basketball has been confirmed
					successfully. We are thrilled to have you on board for this season!
					Stay tuned for updates, news and more. If you have any questions,
					please don’t hesitate to send an email at riseupbballleague@gmail.com
				</p>
				<p>NEXT STEPS:</p>
				<ul className="mb-4">
					<li className="text-lg">1. Customize Your Team Jersey</li>
				</ul>
				<p className="mb-16">
					Visit your profile page to complete these steps. You must complete
					them before the deadlines. If the deadline has passed, jerseys will be
					assigned at random.
				</p>
				<Link
					className="font-barlow rounded bg-neutral-100 px-12 py-2 font-bold text-neutral-900 transition hover:bg-neutral-200"
					href="/user"
				>
					Go to my profile
				</Link>
			</div>
			<div className="w-full border border-neutral-600 p-5 md:w-1/2">
				<h3 className="text-center text-4xl uppercase">Season Details</h3>{" "}
				{/* <ul>
					<li className="flex justify-between">
						<span>Date Registered</span>
						<span></span>
					</li>
					<li className="flex justify-between">
						<span></span>
						<span></span>
					</li>
					<li className="flex justify-between">
						<span></span>
						<span></span>
					</li>
					<li className="flex justify-between">
						<span></span>
						<span></span>
					</li>
					<li className="flex justify-between">
						<span></span>
						<span></span>
					</li>
					<li className="flex justify-between">
						<span></span>
						<span></span>
					</li>
					<li className="flex justify-between">
						<span></span>
						<span></span>
					</li>
					<li className="flex justify-between">
						<span></span>
						<span></span>
					</li>
				</ul> */}
				<ul className="my-5 rounded  p-3 uppercase text-white">
					<li className="my-4 flex justify-between text-2xl">
						<span>Division:</span>{" "}
						<span className="text-right">{team.division?.divisionName}</span>
					</li>
					<li className="my-4 flex justify-between text-2xl">
						<span>Team:</span>{" "}
						<span className="text-right">{team.team.teamName}</span>
					</li>
					<li className="my-4 flex justify-between text-2xl">
						<span>Team Code:</span>{" "}
						<span className="text-right">{team.team.teamCode}</span>
					</li>
					<li className="my-4 flex justify-between text-2xl">
						<span>Arena:</span>
						<span>{team.division?.location}</span>
					</li>
					<li className="my-4 flex justify-between text-2xl">
						<span>Game Days:</span>{" "}
						<span className="text-right">
							{team.division?.day} at {startTimeAMPM} - {endTimeAMPM}
						</span>
					</li>
					<li className="my-4 flex justify-between text-2xl">
						<span>Season Length:</span>{" "}
						<span className="text-right">
							7 Regular games + 1 guaranteed playoff game
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default RegistrationSuccess;
