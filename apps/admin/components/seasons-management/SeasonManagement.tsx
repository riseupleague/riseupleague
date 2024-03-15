"use client";

import { useState } from "react";
import FilterBySeason from "../filters/FilterBySeason";
import { redirect } from "next/navigation";
import SeasonInfo from "./SeasonInfo";

const SeasonManagement = ({ seasons, currentSeason }) => {
	const [season, setSeason] = useState(currentSeason);

	const handleSeasonChange = (e) => {
		const season = seasons.find((season) => season._id === e);
		setSeason(season);

		redirect(`/seasons-management/${season._id}`);
	};

	return (
		<section>
			<FilterBySeason
				currentSeason={currentSeason}
				seasons={seasons}
				handleSeasonChange={handleSeasonChange}
			/>

			<SeasonInfo season={currentSeason} />
		</section>
	);
};

export default SeasonManagement;
