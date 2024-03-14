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
				{currentSeason.seasonName}
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
							{season.seasonName}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default FilterBySeason;
