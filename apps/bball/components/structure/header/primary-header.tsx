"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { useRouter } from "next/navigation";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@ui/components/sheet";
import SignInDialog from "@/components/auth/SignInDialog";
export default function PrimaryHeader(): React.JSX.Element {
	const path = usePathname();
	const router = useRouter(); // Initialize the router

	const headerOptions = [
		{
			label: "home",
			href: "/",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="25"
					viewBox="0 0 25 25"
					fill="none"
				>
					<g clipPath="url(#clip0_980_1620)">
						<path
							d="M1.5625 12.5L3.99305 10.0694M3.99305 10.0694L12.5 1.5625L21.007 10.0694M3.99305 10.0694V22.2222C3.99305 22.8934 4.53716 23.4375 5.20833 23.4375H8.85417M21.007 10.0694L23.4375 12.5M21.007 10.0694V22.2222C21.007 22.8934 20.4628 23.4375 19.7917 23.4375H16.1458M8.85417 23.4375C9.52534 23.4375 10.0694 22.8934 10.0694 22.2222V17.3611C10.0694 16.6899 10.6135 16.1458 11.2847 16.1458H13.7153C14.3865 16.1458 14.9305 16.6899 14.9305 17.3611V22.2222C14.9305 22.8934 15.4747 23.4375 16.1458 23.4375M8.85417 23.4375H16.1458"
							stroke="#FEFEFE"
							strokeWidth="1.67"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</g>
					<defs>
						<clipPath id="clip0_980_1620">
							<rect width="25" height="25" fill="white" />
						</clipPath>
					</defs>
				</svg>
			),
		},
		{
			label: "schedule",
			href: "/games",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="25"
					viewBox="0 0 25 25"
					fill="none"
				>
					<path
						d="M7.03125 3.125V5.46875M17.9687 3.125V5.46875M3.125 19.5312V7.8125C3.125 7.1909 3.37193 6.59476 3.81147 6.15522C4.25101 5.71568 4.84715 5.46875 5.46875 5.46875H19.5312C20.1529 5.46875 20.749 5.71568 21.1885 6.15522C21.6281 6.59476 21.875 7.1909 21.875 7.8125V19.5312M3.125 19.5312C3.125 20.1529 3.37193 20.749 3.81147 21.1885C4.25101 21.6281 4.84715 21.875 5.46875 21.875H19.5312C20.1529 21.875 20.749 21.6281 21.1885 21.1885C21.6281 20.749 21.875 20.1529 21.875 19.5312M3.125 19.5312V11.7187C3.125 11.0971 3.37193 10.501 3.81147 10.0615C4.25101 9.62193 4.84715 9.375 5.46875 9.375H19.5312C20.1529 9.375 20.749 9.62193 21.1885 10.0615C21.6281 10.501 21.875 11.0971 21.875 11.7187V19.5312"
						stroke="#ABAFB3"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			),
		},
		{
			label: "standings",
			href: "/standings",
			dropdown: true,
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="25"
					viewBox="0 0 25 25"
					fill="none"
				>
					<path
						d="M22.9166 7.29167H17.0135V4.16667C17.0135 3.8904 16.9038 3.62545 16.7084 3.4301C16.5131 3.23475 16.2481 3.125 15.9718 3.125H9.02808C8.75182 3.125 8.48687 3.23475 8.29152 3.4301C8.09616 3.62545 7.98642 3.8904 7.98642 4.16667V11.4583H2.08329C1.80703 11.4583 1.54207 11.5681 1.34672 11.7634C1.15137 11.9588 1.04163 12.2237 1.04163 12.5V20.8333C1.04163 21.1096 1.15137 21.3746 1.34672 21.5699C1.54207 21.7653 1.80703 21.875 2.08329 21.875H22.9166C23.1929 21.875 23.4578 21.7653 23.6532 21.5699C23.8485 21.3746 23.9583 21.1096 23.9583 20.8333V8.33333C23.9583 8.05707 23.8485 7.79211 23.6532 7.59676C23.4578 7.40141 23.1929 7.29167 22.9166 7.29167ZM7.98642 19.7917H3.12496V13.5417H7.98642V19.7917ZM14.9302 19.7917H10.0698V5.20833H14.9302V19.7917ZM21.875 19.7917H17.0135V9.375H21.875V19.7917Z"
						fill="#ABAFB3"
					/>
				</svg>
			),
		},

		{
			label: "leaders",
			href: "/leaders",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="25"
					viewBox="0 0 25 25"
					fill="none"
				>
					<path
						d="M16.875 8.28125V16.7187M12.5 11.4453V16.7187M8.125 14.6094V16.7187M5.9375 20.9375H19.0625C20.2706 20.9375 21.25 19.9931 21.25 18.8281V6.17187C21.25 5.0069 20.2706 4.0625 19.0625 4.0625H5.9375C4.72938 4.0625 3.75 5.0069 3.75 6.17187V18.8281C3.75 19.9931 4.72938 20.9375 5.9375 20.9375Z"
						stroke="#ABAFB3"
						strokeWidth="1.503"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			),
		},
		{
			label: "teams",
			href: "/teams",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="19"
					height="19"
					viewBox="0 0 19 19"
					fill="none"
				>
					<path
						d="M13.505 12.2875C13.8754 12.0346 14.3097 11.8917 14.7579 11.8753C15.2061 11.859 15.6497 11.9699 16.0374 12.1952C16.4252 12.4204 16.7413 12.7509 16.9491 13.1483C17.1568 13.5457 17.2479 13.9938 17.2116 14.4408C16.2618 14.7728 15.2529 14.9019 14.25 14.82C14.2469 13.9227 13.9885 13.0441 13.505 12.2882C13.0759 11.6152 12.4839 11.0612 11.7838 10.6776C11.0838 10.294 10.2983 10.0932 9.5 10.0937C8.70187 10.0933 7.91653 10.2942 7.21662 10.6778C6.51671 11.0614 5.92483 11.6153 5.49575 12.2882M14.2492 14.8192L14.25 14.8437C14.25 15.0219 14.2405 15.1976 14.2207 15.371C12.7841 16.1952 11.1562 16.6276 9.5 16.625C7.78208 16.625 6.16946 16.169 4.77929 15.371C4.75894 15.1878 4.74916 15.0035 4.75 14.8192M4.75 14.8192C3.74745 14.9041 2.73909 14.7754 1.78996 14.4416C1.75382 13.9947 1.84489 13.5468 2.05265 13.1495C2.26041 12.7522 2.57637 12.4219 2.964 12.1966C3.35163 11.9714 3.79509 11.8605 4.24311 11.8767C4.69113 11.8929 5.12541 12.0356 5.49575 12.2882M4.75 14.8192C4.75284 13.922 5.01253 13.0442 5.49575 12.2882M11.875 5.34375C11.875 5.97364 11.6248 6.57773 11.1794 7.02313C10.734 7.46853 10.1299 7.71875 9.5 7.71875C8.87011 7.71875 8.26602 7.46853 7.82062 7.02313C7.37522 6.57773 7.125 5.97364 7.125 5.34375C7.125 4.71386 7.37522 4.10977 7.82062 3.66437C8.26602 3.21897 8.87011 2.96875 9.5 2.96875C10.1299 2.96875 10.734 3.21897 11.1794 3.66437C11.6248 4.10977 11.875 4.71386 11.875 5.34375ZM16.625 7.71875C16.625 7.95267 16.5789 8.18429 16.4894 8.4004C16.3999 8.61652 16.2687 8.81288 16.1033 8.97828C15.9379 9.14369 15.7415 9.27489 15.5254 9.36441C15.3093 9.45393 15.0777 9.5 14.8437 9.5C14.6098 9.5 14.3782 9.45393 14.1621 9.36441C13.946 9.27489 13.7496 9.14369 13.5842 8.97828C13.4188 8.81288 13.2876 8.61652 13.1981 8.4004C13.1086 8.18429 13.0625 7.95267 13.0625 7.71875C13.0625 7.24633 13.2502 6.79327 13.5842 6.45922C13.9183 6.12517 14.3713 5.9375 14.8437 5.9375C15.3162 5.9375 15.7692 6.12517 16.1033 6.45922C16.4373 6.79327 16.625 7.24633 16.625 7.71875ZM5.9375 7.71875C5.9375 7.95267 5.89143 8.18429 5.80191 8.4004C5.71239 8.61652 5.58119 8.81288 5.41578 8.97828C5.25038 9.14369 5.05401 9.27489 4.8379 9.36441C4.62179 9.45393 4.39017 9.5 4.15625 9.5C3.92233 9.5 3.6907 9.45393 3.47459 9.36441C3.25848 9.27489 3.06212 9.14369 2.89671 8.97828C2.73131 8.81288 2.6001 8.61652 2.51059 8.4004C2.42107 8.18429 2.375 7.95267 2.375 7.71875C2.375 7.24633 2.56267 6.79327 2.89671 6.45922C3.23076 6.12517 3.68383 5.9375 4.15625 5.9375C4.62867 5.9375 5.08173 6.12517 5.41578 6.45922C5.74983 6.79327 5.9375 7.24633 5.9375 7.71875Z"
						stroke="#ABAFB3"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			),
		},
		{
			label: "players",
			href: "/players",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="19"
					height="19"
					viewBox="0 0 19 19"
					fill="none"
				>
					<path
						d="M12.4687 4.75C12.4687 5.53736 12.1559 6.29247 11.5992 6.84922C11.0424 7.40597 10.2873 7.71875 9.49994 7.71875C8.71258 7.71875 7.95747 7.40597 7.40072 6.84922C6.84397 6.29247 6.53119 5.53736 6.53119 4.75C6.53119 3.96264 6.84397 3.20753 7.40072 2.65078C7.95747 2.09403 8.71258 1.78125 9.49994 1.78125C10.2873 1.78125 11.0424 2.09403 11.5992 2.65078C12.1559 3.20753 12.4687 3.96264 12.4687 4.75ZM3.56323 15.9267C3.58867 14.369 4.22533 12.8837 5.33591 11.7911C6.4465 10.6985 7.94201 10.0862 9.49994 10.0862C11.0579 10.0862 12.5534 10.6985 13.664 11.7911C14.7745 12.8837 15.4112 14.369 15.4367 15.9267C13.5742 16.7808 11.5489 17.2215 9.49994 17.2187C7.38144 17.2187 5.37061 16.7564 3.56323 15.9267Z"
						stroke="#ABAFB3"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			),
		},
	];

	return (
		<nav>
			<div className="container mx-auto  items-center justify-between py-8 md:flex">
				<div className="flex items-center">
					<div className="block md:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<button className="flex flex-col items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="30"
										height="30"
										viewBox="0 0 25 25"
										fill="none"
									>
										<path
											d="M3.90625 7.03125H21.0937M3.90625 12.5H21.0937M3.90625 17.9687H21.0937"
											stroke="#ffffff"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
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
								</ul>
							</SheetContent>
						</Sheet>
					</div>
					<figure>
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
				<SignInDialog />
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="25"
								height="25"
								viewBox="0 0 25 25"
								fill="none"
							>
								<path
									d="M3.90625 7.03125H21.0937M3.90625 12.5H21.0937M3.90625 17.9687H21.0937"
									stroke="#ABAFB3"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span className="font-barlow text-[12px] uppercase tracking-tighter">
								More
							</span>
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
									<li className={`${isActive && "bg-neutral-600"}`} key={index}>
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
						</ul>
					</SheetContent>
				</Sheet>
			</ul>
		</nav>
	);
}
