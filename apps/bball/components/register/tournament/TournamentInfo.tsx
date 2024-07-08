import React from "react";

const TournamentInfo = () => {
	return (
		<>
			<div className="mx-auto mb-10 flex flex-col gap-14 px-10 md:gap-20 md:px-36 lg:px-44 xl:px-56">
				<p className="font-barlow mt-20 text-center text-xl md:text-2xl lg:text-4xl xl:text-5xl">
					This summer, we are bringing together all teams in our community and
					in other leagues to compete and determine the strongest team.
				</p>

				<div className="flex flex-col gap-10 md:gap-20">
					<h2 className="font-abolition text-center text-3xl md:text-5xl">
						Tournament Details
					</h2>
					<ul className=" font-barlow flex list-disc flex-col gap-5 text-2xl md:text-4xl">
						<li>Two Qualifying Games & One Elimination Round</li>
						<li>2X 16-minute Halves</li>

						<li>Photos & Videos</li>

						<li>Full Game Coverage</li>

						<li>Official Referees</li>
					</ul>
				</div>

				<div className="flex flex-col gap-10 md:gap-20">
					<h2 className=" font-abolition text-center text-3xl md:text-5xl">
						What`s at stake?
					</h2>
					<ul className=" font-barlow flex list-disc flex-col gap-5 text-2xl md:text-4xl">
						<li>Tournament Team Fee Refunded!</li>
						<li>Tournament of Power Trophy</li>
						<li>Championship Rings</li>
						<li>Championship Shirts</li>
						<li>Tournament MVP Award</li>
					</ul>
				</div>

				<div className="flex flex-col gap-10 md:gap-20">
					<h2 className=" font-abolition text-center text-3xl md:text-5xl">
						Tournament Divisions
					</h2>
					<div className="font-barlow flex flex-col justify-between gap-10 lg:flex-row">
						<div>
							<p className="mb-6 text-2xl font-semibold md:text-3xl lg:text-5xl">
								All Asians
							</p>
							<ul className=" flex list-disc flex-col gap-5 text-2xl md:text-4xl">
								<li>Beginner </li>
								<li>Intermediate</li>

								<li>Advanced</li>
							</ul>
						</div>
						<div>
							<p className="font-barlow mb-6 text-2xl font-semibold md:text-3xl lg:text-5xl">
								All Mans Under 6ft
							</p>
							<ul className=" flex list-disc flex-col gap-5 text-2xl md:text-4xl">
								<li>Beginner </li>
								<li>Intermediate</li>

								<li>Advanced</li>
							</ul>
						</div>
						<div>
							<p className="font-barlow mb-6 text-2xl font-semibold md:text-3xl lg:text-5xl">
								All Nations
							</p>
							<ul className=" flex list-disc flex-col gap-5 text-2xl md:text-4xl">
								<li>Beginner </li>
								<li>Intermediate</li>

								<li>Advanced</li>
								<li>Elite (Will Need Approval)</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<h2 className="font-abolition mt-20 text-center text-3xl md:text-5xl">
				Is your team ready to claim the title of the best?
			</h2>
		</>
	);
};

export default TournamentInfo;
