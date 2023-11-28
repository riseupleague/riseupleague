"use client";

import { useState } from "react";
import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";
import { Separator } from "@ui/components/separator";
import { Button } from "@ui/components/button";

export default function CreateYourTeam({ divisions, category }): JSX.Element {
	const [selectedDivision, setSelectedDivision] = useState([]);
	const [isLocationSelected, setIsLocationSelected] = useState(false);
	// Initialize arrays for each location
	const bramptonDivisions = [];
	const vaughanDivisions = [];
	const markhamDivisions = [];

	// Categorize divisions based on location
	divisions.forEach((division) => {
		switch (division.divisionName) {
			case "Filipino Beginners":
			case "Filipinos Greats":
			case "Filipino Intermediates":
			case "Nations Beginner":
			case "Nation Greats":
				bramptonDivisions.push(division);
				break;
			case "Nations Beginners":
			case "Nations Intermediates":
			case "Elites Division":
			case "Nations Greats":
			case "Nation Greats":
				vaughanDivisions.push(division);
				break;
			case "Filipino Greats":
			case "Filipinos Beginners":
				markhamDivisions.push(division);
				break;
			// Add additional cases as needed
			default:
				break;
		}
	});

	return (
		<>
			{!isLocationSelected ? (
				<>
					<Link
						href={"/register"}
						className="my-2 flex items-center gap-3 text-xl text-neutral-300"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15"
							height="20"
							viewBox="0 0 15 20"
							fill="none"
						>
							<path
								d="M8.125 16.25L1.875 10L8.125 3.75"
								stroke="#ABAFB3"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Back
					</Link>

					<h3 className="mt-10  text-3xl uppercase">Choose your city:</h3>

					<div className="mt-10 flex flex-col gap-10 ">
						<button
							onClick={() => {
								setIsLocationSelected(true);
								setSelectedDivision(bramptonDivisions);
							}}
							className="rounded-md bg-neutral-700 px-[16px] py-[26px] text-2xl"
						>
							Brampton
						</button>

						<button
							onClick={() => {
								setIsLocationSelected(true);
								setSelectedDivision(vaughanDivisions);
							}}
							className="rounded-md bg-neutral-700 px-[16px] py-[26px] text-2xl"
						>
							Vaughan
						</button>

						<button
							onClick={() => {
								setIsLocationSelected(true);
								setSelectedDivision(markhamDivisions);
							}}
							className="rounded-md bg-neutral-700 px-[16px] py-[26px] text-2xl"
						>
							Markham
						</button>
					</div>
				</>
			) : (
				<>
					<button
						onClick={() => {
							setIsLocationSelected(false);
						}}
						className="my-2 flex items-center gap-3 text-xl text-neutral-300"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15"
							height="20"
							viewBox="0 0 15 20"
							fill="none"
						>
							<path
								d="M8.125 16.25L1.875 10L8.125 3.75"
								stroke="#ABAFB3"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Back
					</button>

					<h3 className="mt-10  text-3xl uppercase">Choose your difficulty:</h3>

					<div className="mt-10 flex flex-col gap-10 ">
						<Accordion type="single" collapsible className="w-full">
							{selectedDivision.map((division, index) => {
								return (
									<AccordionItem
										key={division.divisionName}
										value={`item-${index}`}
										className=" mb-10  border-b-0"
									>
										<AccordionTrigger className="rounded-md bg-neutral-700 px-[16px] py-[26px] text-2xl">
											{division.divisionName} - {division.location}
										</AccordionTrigger>
										<AccordionContent>
											<div>
												<div className="rounded-md rounded-t-none bg-neutral-700">
													<p className="px-4 py-1 text-lg uppercase text-neutral-300 ">
														Division Details
													</p>
													<Separator
														orientation="horizontal"
														className="bg-neutral-600"
													/>
													<div className="bg-register-card col-span-1 flex flex-col gap-7 p-4">
														<div className="flex  gap-2  md:flex-row">
															<svg
																width="25"
																height="25"
																viewBox="0 0 24 24"
																stroke="#ff422d"
															>
																<path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" />
															</svg>
															<p className="text-sm">{division.location}</p>
														</div>
														<div className="flex  gap-2 md:flex-row">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="22"
																height="22"
																viewBox="0 0 16 16"
																fill="none"
															>
																<path
																	d="M8 4.88889V8L10.3333 10.3333M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
																	stroke="#ff422d"
																	strokeWidth="1.67"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>{" "}
															<p className="text-sm">
																{division.startTime} - {division.endTime}{" "}
															</p>
														</div>
														<div className="flex  gap-2 md:flex-row">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="22"
																height="22"
																viewBox="0 0 16 16"
																fill="none"
															>
																<path
																	d="M4.88889 4.11111V1M11.1111 4.11111V1M4.11111 7.22222H11.8889M2.55556 15H13.4444C14.3036 15 15 14.3036 15 13.4444V4.11111C15 3.252 14.3036 2.55556 13.4444 2.55556H2.55556C1.69645 2.55556 1 3.252 1 4.11111V13.4444C1 14.3036 1.69645 15 2.55556 15Z"
																	stroke="#ff422d"
																	strokeWidth="1.67"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>{" "}
															<p className="text-sm">{division.day}</p>
														</div>
													</div>
													<Separator
														orientation="horizontal"
														className="bg-neutral-600"
													/>
													<div className="col-span-3  p-4">
														<p className="text-sm">{division.description}</p>
														<ul className="my-4 text-sm">
															<li>Includes:</li>

															<li>8 GAMES GUARANTEED</li>
															<li>Top and bottom jersey</li>
															<li>Photos</li>
															<li>Highlights</li>
															<li>Player stats</li>
															<li>Team stats</li>
															<li>Full game coverage</li>
														</ul>

														<div className="mb-5 flex justify-end ">
															<div className="relative flex-1 border-r border-neutral-600  p-4">
																<span className="bg-secondary  mb-2 inline-block w-fit rounded-md px-2 py-1  uppercase text-neutral-400">
																	Other Leagues
																</span>
																<div className="relative flex items-center gap-2">
																	<p className="price-reduced text-5xl font-semibold">
																		$350
																	</p>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="101"
																		height="35"
																		viewBox="0 0 101 35"
																		fill="none"
																		className="absolute"
																	>
																		<path
																			opacity="0.9"
																			d="M98.0625 3.3916L3.00011 31.6076"
																			stroke="#B91C1C"
																			strokeWidth="5"
																			strokeLinecap="round"
																		/>
																	</svg>
																	<span className="text-xs"> + 13% HST</span>
																</div>
															</div>

															<div className="flex-1 p-4">
																<span className="bg-main bg-primary mb-2 inline-block w-fit rounded-md px-2 py-1  uppercase text-white">
																	Our Price
																</span>
																<div className="">
																	<div className="flex items-center gap-2">
																		<p className="mb-2 text-5xl font-semibold">
																			${division.regularPrice}
																		</p>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="101"
																			height="35"
																			viewBox="0 0 101 35"
																			fill="none"
																			className="absolute"
																		>
																			<path
																				opacity="0.9"
																				d="M98.0625 3.3916L3.00011 31.6076"
																				stroke="#B91C1C"
																				strokeWidth="5"
																				strokeLinecap="round"
																			/>
																		</svg>
																		<span className="text-xs">+ 13% HST</span>
																	</div>
																	<span className="text-xs">
																		or 4 installments of{" "}
																		<span className="text-sm">
																			{division.instalmentPrice}
																		</span>{" "}
																		+ 13% HST bi-weekly
																	</span>
																</div>
															</div>
														</div>
														<div className="flex-1 p-4">
															<span className="bg-main mb-2 inline-block w-fit rounded-md bg-green-500 px-2 py-1  uppercase text-white">
																Early Bird
															</span>
															<div className="flex items-center gap-2">
																<p className="mb-2 text-5xl font-semibold">
																	$ {division.earlyBirdPrice}
																</p>

																<span className="text-xs">+ 13% HST</span>
															</div>
															<span className="text-xs">
																or 4 installments of{" "}
																<span className="text-sm">$60</span> + 13% HST
																bi-weekly
															</span>
														</div>
													</div>
												</div>
											</div>
											<div className="mt-10 flex justify-end">
												{category === "create" ? (
													<Link
														className="font-barlow rounded bg-neutral-100 px-12 py-2 font-bold text-neutral-900 transition hover:bg-neutral-200"
														href={`/register/create-team/${division._id}`}
													>
														Continue
													</Link>
												) : (
													<Link
														className="font-barlow rounded bg-neutral-100 px-12 py-2 font-bold text-neutral-900 transition hover:bg-neutral-200"
														href={`/register/join-team/${division._id}`}
													>
														Continue
													</Link>
												)}
											</div>
										</AccordionContent>
									</AccordionItem>
								);
							})}
						</Accordion>
					</div>
				</>
			)}
		</>
	);
}
