"use client";

import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import Link from "next/link";
import FeaturedPlayerCard from "@/components/general/FeaturedPlayerCard";

const Overview = ({ team }) => {
	return (
		<div>
			<h2 className="font-barlow my-4 text-4xl uppercase">Players:</h2>
			{/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{team?.players.map((player, index) => {
					return <FeaturedPlayerCard player={player} key={index} />;
				})}
			</div> */}
		</div>
	);
};

export default Overview;
