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

const FilterByCity = ({
	handleCitiesChange,
	cities,
	placeholder = "All Cities",
}): JSX.Element => (
	<div className="font-barlow flex flex-col gap-2">
		<Label>Filter By City:</Label>
		<Select onValueChange={handleCitiesChange}>
			<SelectTrigger className="font-barlow w-full text-lg capitalize md:w-[250px]">
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
				<SelectGroup>
					<SelectLabel>City:</SelectLabel>
					{cities.map((city, index) => (
						<SelectItem
							className="text-sm capitalize sm:text-lg"
							value={city}
							key={index}
						>
							{city}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	</div>
);

export default FilterByCity;
