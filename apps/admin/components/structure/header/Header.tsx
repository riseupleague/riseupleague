"use client";
import { getCurrentWorker } from "@/api-helpers/controllers/workers-controller";
import { Button } from "@ui/components/button";

import Link from "next/link";

import Image from "next/image";

import MobileNav from "./MobileNav";
import WorkerDropdown from "./WorkerDropdown";
import { useCurrentWorker } from "@/hooks/use-current-worker";

const Header = ({ activeSeason }): JSX.Element => {
	// const session = await getServerSession();
	const user = useCurrentWorker();

	return (
		<header
			className={`sticky top-0 z-20 flex items-center ${user ? "justify-between" : "justify-center"} border-b border-neutral-500 bg-neutral-900 p-6 md:p-10`}
		>
			<figure className="flex justify-center">
				<Link
					href="/"
					className="hidden transition hover:opacity-80 sm:inline-block"
				>
					<Image
						alt="Rise Up Logo"
						src="/images/riseup-logo.png"
						width={200}
						height={100}
						priority
					/>
				</Link>
				<Link href="/" className="transition hover:opacity-80 sm:hidden">
					<Image
						alt="Rise Up Logo"
						src="/images/logo.png"
						width={75}
						height={75}
						priority
					/>
				</Link>
			</figure>

			{user && <WorkerDropdown user={user} />}

			{user && <MobileNav user={user} />}
		</header>
	);
};

export default Header;
