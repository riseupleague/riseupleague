import React from "react";
import PrimaryHeader from "./primary-header";
import SecondaryHeader from "./secondary-header";

export default function Header(): React.JSX.Element {
	// fetch secondary header data (ie. past/future game API)

	return (
		<header>
			<PrimaryHeader />
			<SecondaryHeader />
		</header>
	);
}
