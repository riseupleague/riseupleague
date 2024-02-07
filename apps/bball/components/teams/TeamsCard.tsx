"use client";

import Link from "next/link";
import TeamLogo from "@/components/general/icons/TeamLogo";

const TeamsCard = ({ team }): JSX.Element => {
	return (
		<Link
			href={`/teams/${team?._id}`}
			className="flex w-full items-center justify-between rounded-md border border-neutral-600 bg-neutral-700 px-3 py-1 transition hover:opacity-80"
		>
			<div className="flex items-center gap-3">
				<TeamLogo
					primary={team?.primaryColor || ""}
					secondary={team?.secondaryColor || ""}
					tertiary={team?.tertiaryColor || ""}
					width={15}
					height={14}
					circleHeight={1}
					circleWidth={1}
				/>
				<h5 className="md:text-base lg:text-lg">{team?.teamName}</h5>
			</div>
			<span className="font-barlow text-xs underline transition hover:opacity-80 md:text-sm">
				View Profile
			</span>
		</Link>
	);
};

export default TeamsCard;
