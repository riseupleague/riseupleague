import { Separator } from "@ui/components/separator";
import React from "react";
import GameCard from "../league-schedule/GameCard";

const TeamGames = ({ games }) => {
	return (
		<div className="my-8">
			{games?.map((game, index) => <GameCard game={game} key={index} />)}
		</div>
	);
};

export default TeamGames;
