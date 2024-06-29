"use client";
import { useState } from "react";
import TournamentHero from "@/components/register/tournament/TournamentHero";
import TournamentInfo from "@/components/register/tournament/TournamentInfo";
import TournamentSelection from "@/components/register/tournament/TournamentSelection";
import TournamentForm from "./TournamentForm";
import TournamentDivision from "@/api-helpers/models/TournamentDivision";
const TournamentPage = ({ tournament }) => {
	const [division, setDivision] = useState({});
	const handleDivision = (selectedDivision) => {
		const foundDivision = tournament.tournamentDivisions.find(
			(tournamentDiv) => tournamentDiv._id === selectedDivision
		);
		setDivision(foundDivision);
	};
	return (
		<>
			{Object.keys(division).length > 0 ? (
				<TournamentForm division={division} setDivision={setDivision} />
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
