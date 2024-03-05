"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ArrowRightIcon from "../icons/ArrowRightIcon";

const Breadcrumb = (): JSX.Element => {
	const pathname = usePathname().toString();
	const crumbs = pathname.split("/");

	return (
		<div className="font-barlow flex items-center gap-2">
			{crumbs.map((crumb, index) => (
				<Link
					key={index}
					href={`/${crumb}`}
					className={`${index === crumbs.length - 1 ? "text-primary cursor-not-allowed" : "hover:text-primary transition-all"} flex w-fit items-center gap-2 text-xl capitalize`}
				>
					{index === 0 ? "Home" : crumb}
					<span
						className={`${index === crumbs.length - 1 && "hidden"} scale-50`}
					>
						<ArrowRightIcon />
					</span>
				</Link>
			))}
		</div>
	);
};

export default Breadcrumb;
