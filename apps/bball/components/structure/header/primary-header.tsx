"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { useRouter } from "next/navigation";
import ProfileLink from "@/components/auth/ProfileLink";
import HomeIcon from "@/components/icons/HomeIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import PodiumIcon from "@/components/icons/PodiumIcon";
import TeamIcon from "@/components/icons/TeamIcon";
import PlayerIcon from "@/components/icons/PlayerIcon";
import TrophyIcon from "@/components/icons/TrophyIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@ui/components/sheet";

export default function PrimaryHeader(): React.JSX.Element {
	const path = usePathname();
	const router = useRouter(); // Initialize the router
	const currentDate = new Date();

	// Convert the date to seconds
	const currentDateInSeconds = Math.floor(currentDate.getTime() / 1000);
	const headerOptions = [
		{
			label: "home",
			href: "/",
			icon: <HomeIcon />,
		},
		{
			label: "schedule",
			href: `/schedule/${currentDateInSeconds}`,
			icon: <CalendarIcon />,
		},
		{
			label: "standings",
			href: "/standings",
			dropdown: true,
			icon: <PodiumIcon />,
		},
		// {
		// 	label: "leaders",
		// 	href: "/leaders",
		// 	icon: <TrophyIcon />,
		// },
		{
			label: "teams",
			href: "/teams",
			icon: <TeamIcon />,
		},
		{
			label: "players",
			href: "/players",
			icon: <PlayerIcon />,
		},
	];

	return (
		<nav>
			<div className="container mx-auto flex items-center justify-between py-8">
				<div className="flex items-center">
					<div className="block md:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<button className="flex flex-col items-center justify-center">
									<MenuIcon />
								</button>
							</SheetTrigger>
							<SheetContent side={"left"} className=" bg-neutral-900 ">
								<ul className="mt-16 flex flex-col gap-6">
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
											<li
												className={`px-6 py-2 ${isActive && "bg-neutral-600"}`}
												key={index}
											>
												<SheetClose asChild>
													<Button
														variant="navlink"
														size="navlink"
														onClick={() => router.push(option.href)}
													>
														{option.icon}
														<span className="font-barlow text-[24px] uppercase tracking-tighter">
															{option.label}
														</span>
													</Button>
												</SheetClose>
											</li>
										);
									})}

									<Separator className="mb-4 bg-neutral-600" />
									<li className="flex items-center gap-3 px-6 py-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="19"
											height="19"
											viewBox="0 0 19 19"
											fill="none"
										>
											<path
												d="M7.82087 5.95254C8.74792 5.14108 10.2521 5.14108 11.1791 5.95254C12.107 6.764 12.107 8.07975 11.1791 8.89121C11.0184 9.03292 10.8387 9.14929 10.6487 9.24113C10.0589 9.52692 9.50079 10.032 9.50079 10.6875V11.2813M16.625 9.5C16.625 10.4357 16.4407 11.3622 16.0826 12.2266C15.7246 13.0911 15.1998 13.8765 14.5381 14.5381C13.8765 15.1998 13.0911 15.7246 12.2266 16.0826C11.3622 16.4407 10.4357 16.625 9.5 16.625C8.56433 16.625 7.63783 16.4407 6.77338 16.0826C5.90894 15.7246 5.12348 15.1998 4.46186 14.5381C3.80025 13.8765 3.27542 13.0911 2.91736 12.2266C2.55929 11.3622 2.375 10.4357 2.375 9.5C2.375 7.61033 3.12567 5.79806 4.46186 4.46186C5.79806 3.12567 7.61033 2.375 9.5 2.375C11.3897 2.375 13.2019 3.12567 14.5381 4.46186C15.8743 5.79806 16.625 7.61033 16.625 9.5ZM9.5 13.6563H9.50633V13.6626H9.5V13.6563Z"
												stroke="#ABAFB3"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										<span className="font-barlow text-[24px] uppercase tracking-tighter">
											League
										</span>
									</li>
									<li className="flex items-center gap-3 px-6 py-2">
										<ProfileLink />
									</li>
								</ul>
							</SheetContent>
						</Sheet>
					</div>
					<figure className="flex w-5/6 justify-center">
						<Link href="/" className="transition hover:opacity-80">
							<Image
								alt="Rise Up Logo"
								src="/images/riseup-logo.png"
								width={200}
								height={100}
								priority
							/>
						</Link>
					</figure>
					<div className="w-1/12"></div>
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

						return option.label !== "home" ? (
							<Link
								href={option.href}
								className={`font-oswald hover:text-primary cursor-pointer p-2 font-medium uppercase transition hover:scale-110 ${
									isActive && "text-primary underline"
								}`}
								key={index}
							>
								{option.label}
							</Link>
						) : null;
					})}
				</div>
				<div className="hidden md:block">
					<ProfileLink />
				</div>
			</div>
			<ul className="fixed bottom-0 left-0 z-50 flex  w-full items-center justify-around border border-neutral-600 bg-neutral-700 px-[15px] pb-[25px] pt-[15px] backdrop-blur-md md:hidden">
				{headerOptions.map((option, index) => {
					let isActive;

					// if homepage, make active class exact
					if (option.label === "home") {
						isActive = path === option.href;

						// else just .includes()
					} else {
						isActive = path.includes(option.href);
					}

					return option.label !== "teams" && option.label !== "players" ? (
						<li
							className="flex flex-col items-center justify-center"
							key={index}
						>
							<Link
								href={option.href}
								className={`flex flex-col items-center justify-center"${
									isActive && "text-primary"
								}`}
							>
								{option.icon}
								<span className="font-barlow text-[12px] uppercase tracking-tighter">
									{option.label}
								</span>
							</Link>
						</li>
					) : null;
				})}

				<Sheet>
					<SheetTrigger asChild>
						<button className="flex flex-col items-center justify-center">
							<MenuIcon />
							<span className="font-barlow text-[12px] uppercase tracking-tighter">
								More
							</span>
						</button>
					</SheetTrigger>
					<SheetContent side={"left"} className=" bg-neutral-900">
						<ul className="mt-16 flex flex-col gap-6">
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
									<li
										className={`px-6 py-2 ${isActive && "bg-neutral-600"}`}
										key={index}
									>
										<SheetClose asChild>
											<Button
												variant="navlink"
												size="navlink"
												onClick={() => router.push(option.href)}
											>
												{option.icon}
												<span className="font-barlow text-[24px] uppercase tracking-tighter">
													{option.label}
												</span>
											</Button>
										</SheetClose>
									</li>
								);
							})}

							<Separator className="mb-4 bg-neutral-600" />
							<li className="flex items-center gap-3 px-6 py-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="19"
									height="19"
									viewBox="0 0 19 19"
									fill="none"
								>
									<path
										d="M7.82087 5.95254C8.74792 5.14108 10.2521 5.14108 11.1791 5.95254C12.107 6.764 12.107 8.07975 11.1791 8.89121C11.0184 9.03292 10.8387 9.14929 10.6487 9.24113C10.0589 9.52692 9.50079 10.032 9.50079 10.6875V11.2813M16.625 9.5C16.625 10.4357 16.4407 11.3622 16.0826 12.2266C15.7246 13.0911 15.1998 13.8765 14.5381 14.5381C13.8765 15.1998 13.0911 15.7246 12.2266 16.0826C11.3622 16.4407 10.4357 16.625 9.5 16.625C8.56433 16.625 7.63783 16.4407 6.77338 16.0826C5.90894 15.7246 5.12348 15.1998 4.46186 14.5381C3.80025 13.8765 3.27542 13.0911 2.91736 12.2266C2.55929 11.3622 2.375 10.4357 2.375 9.5C2.375 7.61033 3.12567 5.79806 4.46186 4.46186C5.79806 3.12567 7.61033 2.375 9.5 2.375C11.3897 2.375 13.2019 3.12567 14.5381 4.46186C15.8743 5.79806 16.625 7.61033 16.625 9.5ZM9.5 13.6563H9.50633V13.6626H9.5V13.6563Z"
										stroke="#ABAFB3"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<span className="font-barlow text-[24px] uppercase tracking-tighter">
									League
								</span>
							</li>
							<li className="flex items-center gap-3 px-6 py-2">
								<ProfileLink />
							</li>
						</ul>
					</SheetContent>
				</Sheet>
			</ul>
		</nav>
	);
}
