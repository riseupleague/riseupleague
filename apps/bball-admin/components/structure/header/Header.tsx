import React from "react";

export default function Header(): JSX.Element {
	return (
		<header className="sticky top-0 z-20 border-b border-neutral-500 bg-neutral-900">
			<div className="container mx-auto flex justify-center">
				<h2>ADMIN SITE</h2>
			</div>
		</header>
	);
}
