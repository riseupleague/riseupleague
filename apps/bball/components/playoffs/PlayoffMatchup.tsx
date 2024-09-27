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
					<div className="flex gap-1 text-left">
						<span className="text-primary">{teams[0].seed}: </span>
						<span className="hidden lg:block">{teams[0].teamName}</span>
						<span className="block lg:hidden">{teams[0].teamNameShort}</span>
						<span className="ml-1 text-neutral-500">
							({teams[0].wins}-{teams[0].losses})
						</span>
					</div>
					<hr className="border-t border-neutral-600" />
					<div className="flex gap-1 text-left">
						<span className="text-primary">{teams[1].seed}: </span>
						<span className="hidden lg:block">{teams[1].teamName}</span>
						<span className="block lg:hidden">{teams[1].teamName}</span>
						<span className="ml-1 text-neutral-500">
							({teams[1].wins}-{teams[1].losses})
						</span>
					</div>
				</>
			) : (
				<div className="flex h-full items-center justify-center">TBD</div>
			)}
		</Link>
	);
};

export default PlayoffMatchup;
