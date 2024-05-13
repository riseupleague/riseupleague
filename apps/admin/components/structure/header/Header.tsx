"use client";

import { RxHamburgerMenu } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@ui/components/button";

const Header = (): JSX.Element => {
	const { data: session } = useSession();

	return (
		<header className="sticky top-0 z-20 border-b border-neutral-500 bg-neutral-900">
			<div className="container mx-auto my-4 flex w-full justify-end">
				<RxHamburgerMenu className="size-8 md:hidden" />

				{session && <Button onClick={() => signOut()}>Sign Out</Button>}
			</div>
		</header>
	);
};

export default Header;
