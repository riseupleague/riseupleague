"use client";

import { Button } from "@ui/components/button";

import FilterAccordion from "./FilterAll/FilterAccordion";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
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
	return (
		<div className="grid grid-cols-2 gap-2">
			<div className="block sm:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<Button>Filter</Button>
					</SheetTrigger>
					<SheetContent side={"bottom"} className=" h-[85%] bg-neutral-900 ">
						<SheetHeader>
							<SheetTitle className="uppercase">Filter and Sort</SheetTitle>
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
			<div className="hidden sm:block">
				<Sheet>
					<SheetTrigger asChild>
						<Button>Filter</Button>
					</SheetTrigger>
					<SheetContent side={"right"} className="  bg-neutral-900 ">
						<SheetHeader>
							<SheetTitle className="uppercase">Filter and Sort</SheetTitle>
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
		</div>
	);
};
export default FilterAll;
