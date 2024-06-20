"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
} from "@ui/components/select";

const FilterBySeason = ({ currentSeason, seasons, handleSeasonChange }) => {
	return (
		<Select onValueChange={handleSeasonChange}>
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
	);
};

export default FilterBySeason;
