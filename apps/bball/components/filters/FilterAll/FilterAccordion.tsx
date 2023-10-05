"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";
import FilterCheckbox from "./FilterCheckbox";
import { useState } from "react";

export default function FilterAccordion({
	divisions,
	teams,
	onFilterChange,
	teamCheckboxState,
	divisionCheckboxState,
	setTeamCheckboxState,
	setDivisionCheckboxState,
}) {
	// Maintain checkbox state in the parent component

	// Function to update the team checkbox state when a checkbox is checked or unchecked
	const handleTeamCheckboxChange = (id, checked) => {
		setTeamCheckboxState((prevState) => ({
			...prevState,
			[id]: checked,
		}));

		onFilterChange({
			teams: {
				...teamCheckboxState,
				[id]: checked,
			},
			divisions: divisionCheckboxState,
		});
	};

	// Function to update the division checkbox state when a checkbox is checked or unchecked
	const handleDivisionCheckboxChange = (id, checked) => {
		setDivisionCheckboxState((prevState) => ({
			...prevState,
			[id]: checked,
		}));

		onFilterChange({
			teams: teamCheckboxState,
			divisions: {
				...divisionCheckboxState,
				[id]: checked,
			},
		});
	};

	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>Filter By Division</AccordionTrigger>
				<AccordionContent>
					{divisions.map((division) => (
						<FilterCheckbox
							key={division._id}
							name={division.divisionName}
							id={division._id}
							checked={divisionCheckboxState[division.divisionName] || false}
							onChange={(checked) =>
								handleDivisionCheckboxChange(division.divisionName, checked)
							}
						/>
					))}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Filter By Team</AccordionTrigger>
				<AccordionContent style={{ maxHeight: "400px", overflowY: "auto" }}>
					{teams.map((team) => (
						<FilterCheckbox
							key={team._id}
							name={team.teamName}
							id={team._id}
							checked={teamCheckboxState[team.teamName] || false} // Pass the checked state
							onChange={(checked) =>
								handleTeamCheckboxChange(team.teamName, checked)
							} // Pass the change function
						/>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
