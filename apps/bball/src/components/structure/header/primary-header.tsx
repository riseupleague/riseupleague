"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function PrimaryHeader(): React.JSX.Element {
	const path = usePathname();

	const headerOptions = [
		{
			label: "home",
			href: "/",
		},
		{
			label: "games",
			href: "/games",
		},
		{
			label: "standings",
			href: "/standings",
		},
		{
			label: "teams",
			href: "/teams",
		},
		{
			label: "players",
			href: "/players",
		},
	];

	return (
		<nav className="container mx-auto hidden justify-between py-8 md:flex">
			<div>
				<Link href="/" className="transition hover:opacity-80">
					<Image
						alt="Rise Up Logo"
						src="/images/riseup-logo.png"
						width={200}
						height={100}
						priority
					/>
				</Link>
			</div>
			<div className="hidden items-center gap-7 md:flex">
				{headerOptions.map((option, index) => {
					const isActive = path === option.href;

					return (
						<Link
							href={option.href}
							className={`font-oswald hover:text-primary p-2 font-medium uppercase transition hover:scale-110 ${
								isActive && "text-primary pointer-events-none underline"
							}`}
							key={index}
						>
							{option.label}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
