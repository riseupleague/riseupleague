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

const FilterByStat = ({
	handleStatChange,
	filterPlaceholder = "Points",
}): JSX.Element => {
	const stats = ["points", "rebounds", "assists", "steals", "blocks"];

	return (
		<div className="font-barlow flex flex-col gap-2">
			<Label>Filter By Stat:</Label>
			<Select onValueChange={handleStatChange}>
				<SelectTrigger className="font-barlow w-full text-lg capitalize md:w-[250px]">
					<SelectValue placeholder={filterPlaceholder} />
				</SelectTrigger>
				<SelectContent
					ref={(ref) => {
						if (!ref) return;
						ref.ontouchstart = (e) => {
							e.preventDefault();
						};
					}}
					className="font-barlow text-lg capitalize"
				>
					<SelectGroup>
						<SelectLabel>Stat:</SelectLabel>
						{stats.map((stat, index) => (
							<SelectItem
								className="text-sm capitalize sm:text-lg"
								value={stat}
								key={index}
							>
								{stat}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default FilterByStat;
