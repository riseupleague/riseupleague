import React from "react";
import PrimaryHeader from "./primary-header";

export default function Header(): JSX.Element {
	return (
		<header className="sticky top-0 z-20 bg-neutral-900">
			<PrimaryHeader />
		</header>
	);
}
