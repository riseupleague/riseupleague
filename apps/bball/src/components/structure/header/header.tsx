import React from "react";
import PrimaryHeader from "./primary-header";
import SecondaryHeader from "./secondary-header";
import { connectToDatabase } from "@/src/api-helpers/utils";
<<<<<<< HEAD
import { getAllPlayers } from "@/src/api-helpers/controllers/players-controller";

export default async function Header(): Promise<React.JSX.Element> {
	await connectToDatabase();
	const res = await getAllPlayers();
	const { allPlayers } = await res.json();
=======
import { getAllCurrentDivisionsNameAndId } from "@/src/api-helpers/controllers/divisions-controller";

// Define the type for a Division object
type Division = {
	_id: string; // Assuming _id is a string
	divisionName: string;
	season: string; // Assuming season is a string (ObjectId.toString())
	teams: any[]; // An array of Team objects
};

export default async function Header(): Promise<JSX.Element> {
	// fetch secondary header data (ie. past/future game API)
	await connectToDatabase();
	const resDivisionsNameAndId = await getAllCurrentDivisionsNameAndId();
	const { divisionsNameAndId }: { divisionsNameAndId: Division[] } =
		await resDivisionsNameAndId.json();
>>>>>>> origin/staging

	return (
		<header>
			<PrimaryHeader />
			<SecondaryHeader />
		</header>
	);
}
