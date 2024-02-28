import React from "react";
import RegisterPrice from "./RegisterPrice";
import RegisterServices from "./RegisterServices";
import RegisterCards from "./RegisterCards";
import RegisterQuestions from "./RegisterQuestions";
import RegisterCTABanner from "./RegisterCTABanner";

const RegisterPageInfo = () => {
	return (
		<>
			<RegisterPrice />
			<RegisterServices />
			<RegisterCards />
			<RegisterQuestions />
			<RegisterCTABanner />
		</>
	);
};

export default RegisterPageInfo;
