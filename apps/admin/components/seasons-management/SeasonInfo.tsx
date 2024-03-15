"use client";

import AddSeason from "./AddSeason";
import EditSeason from "./EditSeason";

const SeasonInfo = ({ season }) => {
	return (
		<div className="my-4 flex flex-col gap-3">
			<h5 className="m-0">
				Name: <span className="font-semibold">{season?.seasonName}</span>
			</h5>
			{season?.active !== null && (
				<h5 className="m-0">
					Active:{" "}
					<span
						className={`${season?.active ? "text-green-400" : "text-primary"} font-semibold`}
					>
						{season?.active?.toString()}
					</span>
				</h5>
			)}
			{season?.register !== null && (
				<h5 className="m-0">
					Register:{" "}
					<span
						className={`${season?.register ? "text-green-400" : "text-primary"} font-semibold`}
					>
						{season?.register?.toString()}
					</span>
				</h5>
			)}

			<div className="mt-2 space-y-3 md:mt-8">
				<EditSeason season={season} id={season._id} />
				<AddSeason />
			</div>
		</div>
	);
};

export default SeasonInfo;
