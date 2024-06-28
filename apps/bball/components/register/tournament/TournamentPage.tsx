"use client";
import { useState } from "react";
import TournamentHero from "@/components/register/tournament/TournamentHero";
import TournamentInfo from "@/components/register/tournament/TournamentInfo";
import TournamentSelection from "@/components/register/tournament/TournamentSelection";
import TournamentForm from "./TournamentForm";
const TournamentPage = ({ tournament }) => {
	console.log("tournament:", tournament);
	const [division, setDivision] = useState("");
	const handleDivision = (selectedDivision) => {
		setDivision(selectedDivision);
	};
	return (
		<>
			{division && division !== "" ? (
				<TournamentForm tournament={tournament} />
			) : (
				<>
					<TournamentHero />
					<TournamentInfo />
					<TournamentSelection onDivision={handleDivision} />
				</>
			)}
		</>
	);
};

export default TournamentPage;
