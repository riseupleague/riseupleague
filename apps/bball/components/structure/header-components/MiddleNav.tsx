"use client";

import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@ui/components/navigation-menu";

const MiddleNav = ({ headerOptions, path }): JSX.Element => {
	const options = headerOptions.filter((option) => option.label !== "home");

	return (
		<NavigationMenu className="hidden w-full lg:flex">
			<NavigationMenuList>
				{options.map((option, index) => {
					let isActive;

					// if homepage, make active class exact
					if (option.label === "home") {
						isActive = path === option.href;
					}
					// schedule
					else if (option.label === "schedule") {
						isActive = path.includes("/schedule");
					}
					// else just .includes()
					else {
						isActive = path.includes(option.href);
					}

					return (
						<NavigationMenuItem
							key={index}
							className="font-inter w-full capitalize"
						>
							{option.submenu ? (
								// dropdown menu
								<NavigationMenu>
									<NavigationMenuTrigger
										className={`${isActive && "text-primary"} hover:text-primary text-base capitalize transition-all`}
									>
										{option.label}
									</NavigationMenuTrigger>
									<NavigationMenuContent className="border-none">
										<ul className="flex flex-col bg-neutral-700 px-3 py-2">
											{option.submenu.map((subOption, index) => (
												<NavigationMenuLink key={index} asChild>
													<Link
														href={subOption.href}
														className={`${navigationMenuTriggerStyle()} font-inter w-full capitalize text-neutral-300 hover:text-neutral-100`}
													>
														<span className="text-base">{subOption.label}</span>
													</Link>
												</NavigationMenuLink>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenu>
							) : (
								// non-dropdown menu
								<Link href={option.href} legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										<span
											className={`${isActive && "text-primary"} hover:text-primary text-base capitalize transition-all`}
										>
											{option.label}
										</span>
									</NavigationMenuLink>
								</Link>
							)}
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default MiddleNav;
