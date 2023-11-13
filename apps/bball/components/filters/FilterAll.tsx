"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@ui/components/button";
import FilterAccordion from "./FilterAll/FilterAccordion";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@ui/components/sheet";

const FilterAll = ({
	divisions,
	teams,
	onFilterChange,
	teamCheckboxState,
	divisionCheckboxState,
	setTeamCheckboxState,
	setDivisionCheckboxState,
}) => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		// Function to handle window resize
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 640); // Adjust the threshold as needed
		};

		// Add event listener for window resize
		window.addEventListener("resize", handleResize);

		// Call handleResize on initial mount
		handleResize();

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="grid grid-cols-2 gap-2">
			<Sheet>
				<SheetTrigger asChild>
					<Button>Filter</Button>
				</SheetTrigger>
				<SheetContent
					side={isSmallScreen ? "bottom" : "right"} // Use dynamic side based on screen size
					className={`w-full bg-neutral-900 ${isSmallScreen ? "h-[85%]" : ""}`}
				>
					<SheetHeader>
						<SheetTitle className="font-barlow text-2xl uppercase">
							Filter and Sort
						</SheetTitle>
					</SheetHeader>
					<FilterAccordion
						divisions={divisions}
						teams={teams}
						onFilterChange={onFilterChange}
						teamCheckboxState={teamCheckboxState}
						divisionCheckboxState={divisionCheckboxState}
						setTeamCheckboxState={setTeamCheckboxState}
						setDivisionCheckboxState={setDivisionCheckboxState}
					/>
					<SheetFooter className="mt-10 flex gap-2">
						<SheetClose asChild>
							<Button>Clear All</Button>
						</SheetClose>
						<SheetClose asChild>
							<Button>Apply</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
};
export default FilterAll;
