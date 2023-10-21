"use client";

import Link from "next/link";
import TeamLogo from "@/components/general/icons/TeamLogo";

export default function TeamsCard({ team }) {
	return (
		<article className="flex w-full items-center justify-between rounded-md border border-neutral-600 bg-neutral-700 px-6 py-4">
			<div className="flex items-center gap-3">
				<TeamLogo
					primary={team.primaryColor}
					secondary={team.secondaryColor}
					tertiary={team.tertiaryColor}
					width={15}
					height={14}
					circleHeight={1}
					circleWidth={1}
				/>
				<h3 className="font-barlow text-lg uppercase">{team.teamName}</h3>
			</div>
			<Link
				href={`/teams/${team._id}`}
				className="font-barlow text-sm underline transition hover:opacity-80"
			>
				View Profile
			</Link>
		</article>
	);
}
