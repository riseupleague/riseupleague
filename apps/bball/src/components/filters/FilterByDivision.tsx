"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectLabel,
	SelectGroup,
} from "@/components/ui/select";

const FilterByDivision = ({
	selectedDivision,
	handleDivisionChange,
	divisions,
}) => {
	return (
		<SelectGroup className="z-50 w-full  text-white md:w-72">
			<SelectLabel>Filter By Division</SelectLabel>
			<Select
				defaultValue={selectedDivision}
				onValueChange={handleDivisionChange}
			>
				<SelectTrigger className="w-full">
					<SelectValue />
				</SelectTrigger>
				<SelectContent
					className="w-full bg-neutral-900"
					ref={(ref) => {
						if (!ref) return;
						ref.ontouchstart = (e) => {
							e.preventDefault();
						};
					}}
				>
					{divisions?.map((division) => (
						<SelectItem
							className="w-full cursor-pointer"
							value={division._id}
							key={division._id}
						>
							{division.divisionName}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</SelectGroup>
	);
};

export default FilterByDivision;
