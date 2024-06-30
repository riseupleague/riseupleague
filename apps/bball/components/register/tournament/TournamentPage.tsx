"use client";
import { useState, useRef } from "react";
import TournamentDivision from "@/api-helpers/models/TournamentDivision";
import TournamentHero from "@/components/register/tournament/TournamentHero";
import TournamentInfo from "@/components/register/tournament/TournamentInfo";
import TournamentSelection from "@/components/register/tournament/TournamentSelection";
import TournamentForm from "./TournamentForm";
import TournamentSummary from "@/components/register/tournament/TournamentSummary";
const TournamentPage = ({ tournament }) => {
	const [registerInfo, setRegisterInfo] = useState({
		step: 1,
		roster: [],
		division: {},
	});

	const targetRef = useRef(null);

	const handleDivision = (selectedDivision) => {
		const foundDivision = tournament.tournamentDivisions.find(
			(tournamentDiv) => tournamentDiv._id === selectedDivision
		);
		setRegisterInfo({ ...registerInfo, step: 2, division: foundDivision });
	};
	console.log("registerInfo:", registerInfo);
	console.log("tournament:", tournament);

	// Function to handle button click and scroll to the target element
	const scrollToElement = () => {
		targetRef.current.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<section>
			{registerInfo.step === 1 && (
				<>
					<TournamentHero onScroll={scrollToElement} />
					<TournamentInfo />
					<TournamentSelection
						onDivision={handleDivision}
						targetRef={targetRef}
					/>
				</>
			)}

			{registerInfo.step === 2 && (
				<TournamentForm
					registerInfo={registerInfo}
					setRegisterInfo={setRegisterInfo}
				/>
			)}
			{registerInfo.step === 3 && (
				<TournamentSummary
					registerInfo={registerInfo}
					setRegisterInfo={setRegisterInfo}
				/>
			)}
		</section>
	);
};

export default TournamentPage;
