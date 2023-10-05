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

const FilterByTeam = ({ selectedTeam, handleTeamChange, teams }) => {
	return (
		<div className="font-barlow flex flex-col gap-2">
			<Label>Filter By Team:</Label>
			<Select onValueChange={handleTeamChange}>
				<SelectTrigger className="font-barlow w-full text-lg md:w-[180px]">
					<SelectValue placeholder="All Teams" />
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
						<SelectLabel>Team:</SelectLabel>
						{teams.map((team, index) => (
							<SelectItem value={team._id} key={index}>
								{team.teamName}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default FilterByTeam;
