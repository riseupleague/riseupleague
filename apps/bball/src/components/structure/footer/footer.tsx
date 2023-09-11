"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Footer(): React.JSX.Element {
	// for active class
	const path = usePathname();

	return (
		<footer className="container mx-auto flex flex-col items-center justify-center py-8">
			<Link href="/" className="text-2xl font-bold transition hover:opacity-80">
				<Image
					src="/images/riseup-logo.png"
					alt="Logo"
					width={200}
					height={100}
					priority
				/>
			</Link>
			<p className="mt-5 text-xs text-[#a3a3a3]">
				&#169; Copyright 2023 Rise Up. All rights reserved.
			</p>
		</footer>
	);
}
