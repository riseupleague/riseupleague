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
	handleDivisionChange,
	divisions,
	placeholder = "All Divisions",
}): JSX.Element => (
	<div className="font-barlow flex flex-col gap-2">
		<Label>Filter By Division:</Label>
		<Select onValueChange={handleDivisionChange}>
			<SelectTrigger className="font-barlow w-full text-lg md:w-[250px]">
				<SelectValue placeholder={placeholder} />
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
				<SelectGroup className="overflow-y-scroll">
					<SelectLabel>Division:</SelectLabel>
					{divisions.map((division, index) => (
						<SelectItem
							className="text-sm sm:text-lg"
							value={division._id || "default"}
							key={index}
						>
							{division.divisionName}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	</div>
);

export default FilterByDivision;
