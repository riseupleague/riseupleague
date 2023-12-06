"use client";

import Link from "next/link";
import { Button } from "@ui/components/button";

export default function SidebarContent({ sidebarLinks }): JSX.Element {
	return (
		<ul className="my-8 flex flex-col gap-4">
			{sidebarLinks.map((link, index) => (
				<Link
					key={index}
					href={link.href}
					className="hover:text-primary capitalize transition-all"
				>
					{link.title}
				</Link>
			))}
		</ul>
	);
}
