import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import React, { useState } from "react";
import JerseyDetails from "./JerseyDetails";
import JerseySelection from "./JerseySelection";

const JerseyCreation = ({
	registerInfo,

	setRegisterInfo,
}) => {
	const [isJerseyDetail, setIsJerseyDetail] = useState(false);
	return (
		<section>
			{!isJerseyDetail && (
				<JerseyDetails
					onJerseyDetail={setIsJerseyDetail}
					registerInfo={registerInfo}
					setRegisterInfo={setRegisterInfo}
				/>
			)}

			{isJerseyDetail && <JerseySelection />}
		</section>
	);
};

export default JerseyCreation;
