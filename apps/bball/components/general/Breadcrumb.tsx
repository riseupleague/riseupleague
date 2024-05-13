"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

const Breadcrumb = (): JSX.Element => {
	const pathname = usePathname().toString();
	const crumbs = pathname.split("/");

	return (
		<div className="font-barlow flex items-center gap-2">
			{crumbs.map((crumb, index) => {
				if (index === crumbs.length - 1) {
					return (
						<div
							key={index}
							className={`${index === crumbs.length - 1 ? "text-primary" : "hover:text-primary transition-all"} flex w-fit items-center gap-2 text-xl capitalize`}
						>
							{index === 0 ? "Home" : crumb}
							<span
								className={`${index === crumbs.length - 1 && "hidden"} scale-50`}
							>
								<FaArrowRight className="size-6 text-neutral-400" />
							</span>
						</div>
					);
				} else {
					return (
						<Link
							key={index}
							href={`/${crumb}`}
							className={`${index === crumbs.length - 1 ? "text-primary" : "hover:text-primary transition-all"} flex w-fit items-center gap-2 text-xl capitalize`}
						>
							{index === 0 ? "Home" : crumb}
							<span
								className={`${index === crumbs.length - 1 && "hidden"} scale-50`}
							>
								<FaArrowRight className="size-6 text-neutral-400" />
							</span>
						</Link>
					);
				}
			})}
		</div>
	);
};

export default Breadcrumb;
