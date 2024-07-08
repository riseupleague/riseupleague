"use client";
import { useState, useRef } from "react";
import TournamentDivision from "@/api-helpers/models/TournamentDivision";
import TournamentHero from "@/components/register/tournament/TournamentHero";
import TournamentInfo from "@/components/register/tournament/TournamentInfo";
import TournamentSelection from "@/components/register/tournament/TournamentSelection";
import TournamentForm from "./TournamentForm";
import TournamentSummary from "@/components/register/tournament/TournamentSummary";
const TournamentPage = ({ tournament, isRiseUpCustomer, user, selections }) => {
	const userDivisions = [];
	const [registerInfo, setRegisterInfo] = useState({
		step: 1,
		roster: [],
		division: {},
		price: {
			regularPrice: tournament.regularPrice,
			regularPriceId: tournament.regularPriceId,
			riseUpDiscountPrice: tournament.riseUpDiscountPrice,
			riseUpDiscountPriceId: tournament.riseUpDiscountPriceId,
			otherLeagueDiscountPrice: tournament.otherLeagueDiscountPrice,
			otherLeagueDiscountPriceId: tournament.otherLeagueDiscountPriceId,
		},
	});

	const targetRef = useRef(null);
	const topRef = useRef(null);
	const handleDivision = (selectedDivision) => {
		console.log("selectedDivision:", selectedDivision);
		const foundDivision = tournament.tournamentDivisions.find(
			(tournamentDiv) => {
				return tournamentDiv._id.toString() === selectedDivision;
			}
		);

		setRegisterInfo({ ...registerInfo, step: 2, division: foundDivision });
		scrollToTop();
	};

	// Function to handle button click and scroll to the target element
	const scrollToElement = () => {
		targetRef.current.scrollIntoView({ behavior: "smooth" });
	};

	const scrollToTop = () => {
		topRef.current.scrollIntoView({ behavior: "smooth" });
	};

	console.log(registerInfo);
	return (
		<section ref={topRef}>
			{registerInfo.step === 1 && (
				<>
					<TournamentHero onScroll={scrollToElement} />
					<TournamentInfo />
					<TournamentSelection
						onDivision={handleDivision}
						targetRef={targetRef}
						userDivisions={userDivisions}
						selections={selections}
					/>
				</>
			)}

			{registerInfo.step === 2 && (
				<TournamentForm
					registerInfo={registerInfo}
					setRegisterInfo={setRegisterInfo}
					onScrollToTop={scrollToTop}
				/>
			)}
			{registerInfo.step === 3 && (
				<TournamentSummary
					registerInfo={registerInfo}
					setRegisterInfo={setRegisterInfo}
					isRiseUpCustomer={isRiseUpCustomer}
					user={user}
				/>
			)}
		</section>
	);
};

export default TournamentPage;
