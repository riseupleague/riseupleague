import React from "react";
import PrimaryHeader from "./PrimaryHeader";
import TopHeader from "./TopHeader";

const Header = (): JSX.Element => {
	return (
		<header className="sticky top-0 z-20 bg-neutral-900">
			<TopHeader />
			<PrimaryHeader />
		</header>
	);
};

export default Header;
