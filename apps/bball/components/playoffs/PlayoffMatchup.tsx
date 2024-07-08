"use client";

import Link from "next/link";

const PlayoffMatchup = ({ teams, index }) => {
	let firstRound = [6, 7, 8].includes(index);

	return (
		<Link
			href={`/standings/playoffs`}
			className={`${index === 7 && "-translate-y-10"} rounded border border-neutral-400 p-3 transition-all hover:bg-neutral-700`}
		>
			{!firstRound ? (
				<>
					<div className="text-left">{teams[0].teamName}</div>
					<hr className="border-t border-neutral-600" />
					<div className="text-left">{teams[1].teamName}</div>
				</>
			) : (
				<div className="flex h-full items-center justify-center">TBD</div>
			)}
		</Link>
	);
};

export default PlayoffMatchup;
