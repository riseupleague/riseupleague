import { Metadata } from "next";
import { redirect } from "next/navigation";

const Success = (): JSX.Element => {
	redirect(`/`);
};

export const metadata: Metadata = {
	title: "Rise Up League | Success!",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default Success;
