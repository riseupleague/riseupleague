"use client";
import { getCurrentWorker } from "@/api-helpers/controllers/workers-controller";
import { Button } from "@ui/components/button";

import Link from "next/link";

import Image from "next/image";

import MobileNav from "./MobileNav";
import WorkerDropdown from "./WorkerDropdown";
import { useSession } from "next-auth/react";

const Header = ({ activeSeason }): JSX.Element => {
	// const session = await getServerSession();
	const { data: session } = useSession();

	return (
		<header
			className={`sticky top-0 z-20 flex items-center ${session ? "justify-between" : "justify-center"} border-b border-neutral-500 bg-neutral-900 p-6 md:p-10`}
		>
			<figure className="flex justify-center">
				<Link
					href="/"
					className="hidden transition hover:opacity-80 lg:inline-block"
				>
					<Image
						alt="Rise Up Logo"
						src="/images/riseup-logo.png"
						width={200}
						height={100}
						priority
					/>
				</Link>
				<Link href="/" className="transition hover:opacity-80 lg:hidden">
					<Image
						alt="Rise Up Logo"
						src="/images/logo.png"
						width={75}
						height={75}
						priority
					/>
				</Link>
			</figure>

			{session && <WorkerDropdown session={session} />}

			{session && <MobileNav session={session} activeSeason={activeSeason} />}
		</header>
	);
};

export default Header;
