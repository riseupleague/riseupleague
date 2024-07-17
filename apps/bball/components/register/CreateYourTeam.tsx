"use client";

import BackButton from "../general/buttons/BackButton";
import { useState } from "react";
import RegisterProgress from "./create-team/RegisterProgress";
import PickCityDivision from "./create-team/PickCityDivision";
import TeamCreation from "./create-team/TeamCreation";
import RosterBuilding from "./create-team/RosterBuilding";
import Summary from "./create-team/Summary";

const CreateYourTeam = ({ divisions, user }): JSX.Element => {
	const userDivisions = user.basketball.map((player) => player.division?._id);
	const [registerInfo, setRegisterInfo] = useState({
		step: 1,
		allowStep: {
			1: true,
			2: false,
			3: false,
			4: false,
			5: false,
		},
	});

	return (
		<section>
			{registerInfo.step === 1 && <BackButton href="/register" />}
			<RegisterProgress
				registerInfo={registerInfo}
				setRegisterInfo={setRegisterInfo}
			/>

			{registerInfo.step === 1 && (
				<PickCityDivision
					regions={divisions}
					userDivisions={userDivisions}
					registerInfo={registerInfo}
					setRegisterInfo={setRegisterInfo}
				/>
			)}

			{registerInfo.step === 2 && (
				<TeamCreation
					registerInfo={registerInfo}
					setRegisterInfo={setRegisterInfo}
				/>
			)}

			{registerInfo.step === 3 && (
				<RosterBuilding
					registerInfo={registerInfo}
					setRegisterInfo={setRegisterInfo}
				/>
			)}

			{registerInfo.step === 4 && (
				<Summary
					registerInfo={registerInfo}
					setRegisterInfo={setRegisterInfo}
					user={user}
				/>
			)}
		</section>
	);
};

export default CreateYourTeam;
