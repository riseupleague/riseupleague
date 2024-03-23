"use client";

import { useState } from "react";
import AverageStatistics from "@/components/players/player/AverageStatistics";
import PreviousGames from "@/components/players/player/PreviousGames";

const PlayerSections = ({ player, allAvg }): JSX.Element => {
	const [selectedSection, setSelectedSection] = useState("stats");

	const handleNavClick = (sectionId) => {
		setSelectedSection(sectionId);
	};

	const playerNav = [
		// {
		// 	id: "overview",
		// 	label: "Overview",
		// 	component: <Overview player={player} />,
		// },
		{
			id: "stats",
			label: "Stats",
			component: (
				<div>
					<AverageStatistics player={player} allAvg={allAvg} />
				</div>
			),
		},
		{
			id: "previousGames",
			label: "Previous",
			component: <PreviousGames player={player} />,
		},
	];

	// Find the currently selected section in the playerNav array
	const selectedNavItem = playerNav.find(
		(navItem) => navItem.id === selectedSection
	);

	return (
		<div>
			<ul className="no-scrollbar flex w-full items-center justify-between overflow-x-auto border-b border-[#282828] md:gap-3">
				{playerNav.map((navItem) => (
					<li
						className={`font-barlow flex-1 cursor-pointer p-6  text-center text-sm font-semibold uppercase md:text-lg ${
							selectedSection === navItem.id
								? "text-primary border-primary border-b-2"
								: "border-white text-white text-opacity-50"
						}`}
						key={navItem.id}
						onClick={() => handleNavClick(navItem.id)}
					>
						{navItem.label}
					</li>
				))}
			</ul>
			<section>{selectedNavItem && selectedNavItem.component}</section>
		</div>
	);
};

export default PlayerSections;
