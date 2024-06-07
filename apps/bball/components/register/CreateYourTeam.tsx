"use client";

import BackButton from "../general/buttons/BackButton";
import { useState } from "react";
import RegisterProgress from "./create-team/RegisterProgress";
import PickCityDivision from "./create-team/PickCityDivision";
import TeamCreation from "./create-team/TeamCreation";

const CreateYourTeam = ({ divisions, user }): JSX.Element => {
	const userDivisions = user.basketball.map((player) => player.division?._id);
	const [registerInfo, setRegisterInfo] = useState({ step: 1 });

	return (
		<section>
			<BackButton href="/register" />
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
		</section>
	);
};

export default CreateYourTeam;
