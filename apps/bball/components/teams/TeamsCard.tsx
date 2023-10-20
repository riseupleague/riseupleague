"use client";

import Link from "next/link";
import LogoPlaceholder from "@/components/general/icons/LogoPlaceholder";

export default function TeamsCard({ team }) {
	return (
		<Link
			href={`/teams/${team._id}`}
			className="flex w-full items-center justify-between rounded-md border border-neutral-600 bg-neutral-700 px-6 py-4 transition hover:opacity-80"
		>
			<div className="flex items-center gap-3">
				<LogoPlaceholder />
				<h3 className="font-barlow text-lg uppercase">{team.teamName}</h3>
			</div>
			<Link
				href={`/teams/${team._id}`}
				className="font-barlow text-sm underline transition hover:opacity-80"
			>
				View Profile
			</Link>
		</Link>
	);
}
