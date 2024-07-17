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

const FilterBySeason = ({ seasons, handleSeasonChange, currentSeason }) => {
	return (
		<div className="font-barlow flex flex-col gap-2">
			<Select onValueChange={handleSeasonChange}>
				<Label className="mt-0">Filter By Season:</Label>
				<SelectTrigger className="w-full text-lg capitalize transition-all hover:bg-neutral-800 sm:w-[300px]">
					<div>
						{currentSeason.seasonName}{" "}
						{currentSeason.active && (
							<span className="text-green-500">(Active)</span>
						)}
					</div>
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
						<SelectLabel className="text-lg">Select Season:</SelectLabel>
						{seasons.map((season, index) => (
							<SelectItem
								className="text-lg capitalize"
								value={season._id}
								key={index}
							>
								{season.seasonName}{" "}
								{season.active && (
									<span className="text-green-500">(Active)</span>
								)}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default FilterBySeason;
