"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PrimaryHeader(): React.JSX.Element {
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
		<nav className="container mx-auto flex justify-between py-8">
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
				{headerOptions.map((option, index) => (
					<Link
						href={option.href}
						className="font-oswald hover:text-primary py-2 font-medium uppercase transition hover:scale-110"
						key={index}
					>
						{option.label}
					</Link>
				))}
			</div>
		</nav>
	);
}
