"use client";

import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import WorkerDropdown from "./WorkerDropdown";
import { useCurrentWorker } from "@/hooks/use-current-worker";
import packageJson from "../../../package.json";

const Header = ({ activeSeason }): JSX.Element => {
	const user = useCurrentWorker();
	const version = packageJson.version.replace("admin@", "");

	return (
		<header
			className={`${user ? "justify-between" : "justify-center"} sticky top-0 z-20 grid grid-cols-3 items-center border-b border-neutral-500 bg-neutral-900 p-6 md:p-10`}
		>
			<figure className="flex justify-start">
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

			<p className="text-center text-xl md:text-4xl">ADMIN SITE v{version}</p>

			<div className="flex justify-end">
				{user && <WorkerDropdown user={user} />}
				{user && <MobileNav user={user} />}
			</div>
		</header>
	);
};

export default Header;
