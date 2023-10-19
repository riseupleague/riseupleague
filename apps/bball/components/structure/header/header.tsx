import React from "react";
import PrimaryHeader from "./primary-header";
import SeasonCountdown from "./season-countdown";

export default function Header(): JSX.Element {
	return (
		<header>
			<PrimaryHeader />
			{/* <SeasonCountdown /> */}
		</header>
	);
}
