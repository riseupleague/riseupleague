import RegisterPrice from "./RegisterPrice";
import RegisterServices from "./RegisterServices";
import RegisterCards from "./RegisterCards";
import RegisterQuestions from "./RegisterQuestions";
import RegisterCTABanner from "./RegisterCTABanner";
import RegisterBanner from "./RegisterBanner";

const RegisterPageInfo = () => {
	return (
		<>
			<RegisterBanner />
			<RegisterPrice />
			<RegisterServices />
			<RegisterCards />
			<RegisterQuestions />
			<RegisterCTABanner
				description={
					"Join Rise Up league today - Elevate your Overall Player Experience."
				}
				ctaLink={"/register"}
				ctaText={"Register Now"}
			/>
		</>
	);
};

export default RegisterPageInfo;
