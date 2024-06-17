"use client";

import { convertMilitaryToRegularTime } from "@/utils/convertMilitaryToRegularTime";

const UserPlayerSeasonInfo = ({ player }) => {
	return (
		<ul className="w-full rounded border border-neutral-600 bg-neutral-700">
			{player.freeAgent && (
				<p className="my-4">Thank you for joining as a free agent!</p>
			)}
			<li className="flex justify-between border-b border-neutral-600 p-4">
				<span>Player Name:</span>
				<span>{player?.playerName}</span>
			</li>
			<li className="flex justify-between border-b border-neutral-600 p-4">
				<span>Instagram:</span>
				<span>{player?.instagram}</span>
			</li>

			{!player.freeAgent && (
				<>
					<li className="flex justify-between border-b border-neutral-600 p-4">
						<span>Division:</span>
						<span>{player?.division?.divisionName}</span>
					</li>
					<li className="flex justify-between border-b border-neutral-600 p-4">
						<span>Location:</span>
						<span>{player?.division?.location}</span>
					</li>
					<li className="flex justify-between border-b border-neutral-600 p-4">
						<span>Date and Time:</span>
						<span>
							{player.division?.day} between{" "}
							{convertMilitaryToRegularTime(player?.division?.startTime)} and{" "}
							{convertMilitaryToRegularTime(player?.division?.endTime)}
						</span>
					</li>
					<li className="flex justify-between border-b border-neutral-600 p-4">
						<span>Team:</span>
						<span>{player?.team?.teamName}</span>
					</li>
					<li className="flex justify-between border-b border-neutral-600 p-4">
						<span>Team Code:</span>
						<span>{player?.team?.teamCode}</span>
					</li>
					<li className="flex flex-col justify-between border-b border-neutral-600 p-4">
						<div className="flex justify-between">
							<span>Custom Jersey Name:</span>
							<span className="uppercase">{player?.jerseyName}</span>
						</div>
					</li>

					<li className="border-b border-neutral-600 p-4">
						<div className="flex justify-between ">
							<span>Jersey Number:</span>
							<span>{player?.jerseyNumber}</span>
						</div>
					</li>
					<li className="flex justify-between border-b border-neutral-600 p-4">
						<span>Jersey Edition:</span>
						<span>{player?.team?.jerseyEdition}</span>
					</li>
					<li className="flex justify-between border-b border-neutral-600 p-4">
						<span>Jersey Size:</span>
						<span>{player?.jerseySize}</span>
					</li>
					{/* <li className="flex justify-between border-b border-neutral-600 p-4">
						<span>Jersey Bottom:</span>
						<span>{player?.shortSize}</span>
					</li> */}
				</>
			)}

			{player.freeAgent && (
				<p className="text-md my-4 p-4 text-start">
					Jersey information coming soon!
				</p>
			)}
		</ul>
	);
};

export default UserPlayerSeasonInfo;
