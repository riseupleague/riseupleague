"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@ui/components/button";

export default function PrimaryHeader(): React.JSX.Element {
	const path = usePathname();

	const headerOptions = [
		{
			label: "home",
			href: "/",
		},
		{
			label: "schedule",
			href: "/games",
		},
		{
			label: "standings",
			href: "/standings",
			dropdown: true,
		},

		{
			label: "leaders",
			href: "/leaders",
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
		<nav className="container mx-auto hidden items-center justify-between py-8 md:flex">
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
					let isActive;

					// if homepage, make active class exact
					if (option.label === "home") {
						isActive = path === option.href;

						// else just .includes()
					} else {
						isActive = path.includes(option.href);
					}

					return (
						<Link
							href={option.href}
							className={`font-oswald hover:text-primary cursor-pointer p-2 font-medium uppercase transition hover:scale-110 ${
								isActive && "text-primary underline"
							}`}
							key={index}
						>
							{option.label}
						</Link>
					);
				})}
			</div>

			<Button variant="register">
				<Link href={"/register"}> Register Now</Link>
			</Button>
		</nav>
	);
}
