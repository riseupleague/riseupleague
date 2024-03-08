"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarContent = ({ sidebarLinks }): JSX.Element => {
	const pathname = usePathname();

	return (
		<ul className="my-8 flex flex-col gap-4">
			{sidebarLinks.map((link, index) => {
				let isActive;

				// if homepage, make active class exact
				if (link.title === "dashboard") isActive = pathname === link.href;
				else isActive = pathname.includes(link.href);

				return (
					<Link
						key={index}
						href={link.href}
						className={`${isActive && "text-primary font-medium"} hover:text-primary capitalize transition-all`}
					>
						{link.title}
					</Link>
				);
			})}
		</ul>
	);
};

export default SidebarContent;
