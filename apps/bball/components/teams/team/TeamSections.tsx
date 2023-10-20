"use client";
import React, { useState } from "react";
import PreviousGames from "./PreviousGames";
import Statistics from "./Statistics";

export default function TeamSections({ team, allAvg }) {
	const [selectedSection, setSelectedSection] = useState("overview"); // Set the default selected section

	const handleNavClick = (sectionId) => {
		setSelectedSection(sectionId);
	};

	const teamNav = [
		{
			id: "overview",
			label: "Overview",
			component: <div>Overview</div>,
		},
		{
			id: "stats",
			label: "Stats",
			component: (
				<div>
					<Statistics team={team} allAvg={allAvg} />
				</div>
			),
		},
		{
			id: "previousGames",
			label: "Previous",
			component: <PreviousGames team={team} />,
		},
	];

	// Find the currently selected section in the teamNav array
	const selectedNavItem = teamNav.find(
		(navItem) => navItem.id === selectedSection
	);

	return (
		<div>
			<ul className="no-scrollbar flex w-full items-center justify-between overflow-x-auto border-b border-[#282828] md:gap-3">
				{teamNav.map((navItem) => (
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
}
