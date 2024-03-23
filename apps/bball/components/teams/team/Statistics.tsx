"use client";

import BarChart from "./BarChart";
import PointsCircle from "./PointsCircle";
import { FaChevronUp } from "react-icons/fa";

const Statistics = ({ team, allAvg }): JSX.Element => {
	return (
		<div className="font-barlow">
			<div className="mb-10 flex items-center justify-between border-b border-[#282828] pb-5 pt-10">
				<h3 className="text-center">Average Statistics</h3>
			</div>
			<div className="grid gap-4 lg:grid-cols-2">
				<div className="flex items-center justify-between border border-[#292929] p-4 text-center">
					<div className="-ml-2 sm:ml-0">
						<PointsCircle
							team={team}
							pointsAverage={team?.averageStats?.points}
						/>
					</div>
					<ul className="flex flex-1 flex-col justify-between pl-4 sm:flex-row">
						<li className="mb-4 flex flex-1 flex-col items-center sm:mb-0">
							<div className="text-sm text-gray-300">
								<span className=" mr-2 inline-block h-2 w-2 rounded-full bg-[#e16b3d]"></span>
								2PG
							</div>
							<span className="text-lg font-bold text-gray-300">
								{team?.averageStats.twosMade.toFixed(1)}
							</span>
						</li>
						<li className="mb-4 flex flex-1 flex-col items-center sm:mb-0">
							<div className="text-sm text-gray-300">
								<span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#fafafa]"></span>
								3PG
							</div>
							<span className="text-lg font-bold text-gray-300">
								{team?.averageStats.threesMade.toFixed(1)}
							</span>
						</li>
						<li className="mb-4 flex flex-1 flex-col items-center sm:mb-0">
							<div className="text-sm text-gray-300">
								<span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#6366f1]"></span>
								FTM/G
							</div>
							<span className="text-lg font-bold text-gray-300">
								{team?.averageStats.freeThrowsMade.toFixed(1)}
							</span>
						</li>
					</ul>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="border border-[#292929] p-4 text-center">
						<div className="relative text-xl font-bold text-white sm:text-3xl">
							{team?.averageStats?.rebounds?.toFixed(1)}
							<span className="absolute">
								{team?.averageStats.rebounds?.toFixed(1) > allAvg.rebounds && (
									<FaChevronUp color="green" className="ml-1 scale-50" />
								)}
							</span>
						</div>

						<div className="hidden text-sm font-semibold text-gray-300 lg:block">
							Rebounds Per Game
						</div>
						<div className="block text-sm font-semibold text-gray-300 lg:hidden">
							RPG
						</div>
					</div>
					<div className="border border-[#292929] p-4 text-center">
						<div className="relative text-xl font-bold text-white sm:text-3xl">
							{team?.averageStats.assists.toFixed(1)}{" "}
							<span className="absolute">
								{team?.averageStats.assists > allAvg.assists && (
									<FaChevronUp color="green" className="ml-1 scale-50" />
								)}
							</span>
						</div>
						<div className="hidden text-sm font-semibold text-gray-300 lg:block">
							Assists Per Game
						</div>
						<div className="block text-sm font-semibold text-gray-300 lg:hidden">
							APG
						</div>
					</div>
					<div className="border border-[#292929] p-4 text-center">
						<div className="relative text-xl font-bold text-white sm:text-3xl">
							{team?.averageStats.blocks.toFixed(1)}{" "}
							<span className="absolute">
								{team?.averageStats.blocks > allAvg.blocks && (
									<FaChevronUp color="green" className="ml-1 scale-50" />
								)}
							</span>
						</div>
						<div className="hidden text-sm font-semibold text-gray-300 lg:block">
							Blocks Per Game
						</div>
						<div className="block text-sm font-semibold text-gray-300 lg:hidden">
							BPG
						</div>
					</div>
					<div className="border border-[#292929] p-4 text-center">
						<div className="relative text-xl font-bold text-white sm:text-3xl">
							{team?.averageStats.steals.toFixed(1)}{" "}
							<span className="absolute">
								{team?.averageStats.steals > allAvg.steals && (
									<FaChevronUp color="green" className="ml-1 scale-50" />
								)}
							</span>
						</div>
						<div className="hidden text-sm font-semibold text-gray-300 lg:block">
							Steals Per Game
						</div>
						<div className="block text-sm font-semibold text-gray-300 lg:hidden">
							SPG
						</div>
					</div>
				</div>
			</div>
			<div className="mt-10">
				<div className="flex w-full flex-col lg:flex-row">
					<BarChart
						stats={team?.averageStats}
						allAvg={allAvg}
						avgLabel={`Average Team`}
						label={team?.teamName}
					/>
				</div>
			</div>
		</div>
	);
};

export default Statistics;
