"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const FilterByDivision = ({
	selectedDivision,
	handleDivisionChange,
	divisions,
}) => {
	return (
		<SelectGroup className="w-[180px]">
			<Select onValueChange={handleDivisionChange}>
				<SelectTrigger>
					<SelectValue placeholder={selectedDivision} />
				</SelectTrigger>
				<SelectContent
					ref={(ref) => {
						if (!ref) return;
						ref.ontouchstart = (e) => {
							e.preventDefault();
						};
					}}
					className="w-full"
				>
					{divisions.map((division, index) => (
						<SelectItem key={index} value={division._id}>
							{division.divisionName}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</SelectGroup>
	);
};

export default FilterByDivision;
