import React from "react";
import PrimaryHeader from "./primary-header";
import SecondaryHeader from "./secondary-header";
import { connectToDatabase } from "@/src/api-helpers/utils";
import { getAllPlayers } from "@/src/api-helpers/controllers/players-controller";

export default async function Header(): Promise<React.JSX.Element> {
	await connectToDatabase();
	const res = await getAllPlayers();
	const { allPlayers } = await res.json();

	return (
		<header>
			<PrimaryHeader />
			<SecondaryHeader />
		</header>
	);
}
