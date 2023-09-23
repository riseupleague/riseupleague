"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@ui/components/select";

const FilterByDivision = ({
	selectedDivision,
	handleDivisionChange,
	divisions,
}) => {
	return (
		<Select onValueChange={handleDivisionChange}>
			<SelectTrigger className="font-barlow w-[180px] text-lg">
				<SelectValue placeholder={selectedDivision} />
			</SelectTrigger>
			<SelectContent className="font-barlow text-lg">
				<SelectGroup>
					<SelectLabel>Division:</SelectLabel>
					{divisions.map((division, index) => (
						<SelectItem value={division._id} key={index}>
							{division.divisionName}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default FilterByDivision;
