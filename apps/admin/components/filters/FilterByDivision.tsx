"use client";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
} from "@ui/components/select";

const FilterByDivision = ({
	currentDivision,
	divisions,
	handleDivisionChange,
}) => {
	return (
		<Select onValueChange={handleDivisionChange}>
			<SelectTrigger className="w-full text-lg capitalize transition-all hover:bg-neutral-800 sm:w-[300px]">
				{currentDivision.divisionName}
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
					<SelectLabel className="text-lg">Select Division:</SelectLabel>
					{divisions.map((division, index) => (
						<SelectItem
							className="text-lg capitalize"
							value={division._id}
							key={index}
						>
							{division.divisionName}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default FilterByDivision;
