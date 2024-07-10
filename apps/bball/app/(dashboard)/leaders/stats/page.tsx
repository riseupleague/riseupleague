import { connectToDatabase } from "@/api-helpers/utils";
import { getAllCurrentDivisionsNameAndId } from "@/api-helpers/controllers/divisions-controller";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const Leaders = async (): Promise<JSX.Element> => {
	await connectToDatabase();

	const resDivisions = await getAllCurrentDivisionsNameAndId();
	const { divisionsNameAndId } = await resDivisions.json();

	redirect(`/leaders/stats/${divisionsNameAndId[0]._id}`);
};

export const metadata: Metadata = {
	title: "Rise Up League | League Leaders",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default Leaders;
