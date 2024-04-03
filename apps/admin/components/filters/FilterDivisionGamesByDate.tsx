"use client";
import { Label } from "@ui/components/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
} from "@ui/components/select";

const FilterDivisionGamesByDate = ({
	currentDate,
	dates,
	handleDateChange,
}) => {
	return (
		<Select onValueChange={handleDateChange}>
			<Label className="mt-0">Filter By Date:</Label>
			<SelectTrigger className="w-full text-lg capitalize transition-all hover:bg-neutral-800 sm:w-[300px]">
				{currentDate !== "" ? currentDate : "All Dates"}
			</SelectTrigger>
			<SelectContent
				ref={(ref) => {
					if (!ref) return;
					ref.ontouchstart = (e) => {
						e.preventDefault();
					};
				}}
			>
				<SelectGroup>
					<SelectLabel className="text-lg">Select Date:</SelectLabel>
					{dates.map((date, index) => (
						<SelectItem className="text-lg capitalize" value={date} key={index}>
							{date}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default FilterDivisionGamesByDate;
