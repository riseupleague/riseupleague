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
import { Label } from "@ui/components/label";

const FilterByDivision = ({
	selectedDivision,
	handleDivisionChange,
	divisions,
}) => {
	return (
		<div className="font-barlow flex flex-col gap-2">
			<Label>Filter By Division:</Label>
			<Select onValueChange={handleDivisionChange}>
				<SelectTrigger className="font-barlow w-full text-lg md:w-[180px]">
					<SelectValue placeholder={selectedDivision} />
				</SelectTrigger>
				<SelectContent
					ref={(ref) => {
						if (!ref) return;
						ref.ontouchstart = (e) => {
							e.preventDefault();
						};
					}}
					className="font-barlow text-lg"
				>
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
		</div>
	);
};

export default FilterByDivision;
