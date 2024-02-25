import { useState } from "react";
import Link from "next/link";
import { Separator } from "@ui/components/separator";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@ui/components/card";
const CreateYourTeam = ({ divisions, user }): JSX.Element => {
	const userDivisions = user.basketball.map((player) => player.division._id);
	console.log("divisions:", divisions);

	console.log("userDivisions:", userDivisions);
	return (
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

			<h3 className="mt-10  text-3xl uppercase">Pick a city & division:</h3>

			<Accordion type="single" collapsible className="my-10 w-full">
				{divisions.map((divCity, index) => {
					return (
						<AccordionItem key={index} value={`item-${index}`}>
							<AccordionTrigger className="text-4xl uppercase">
								{divCity.city}
							</AccordionTrigger>
							<AccordionContent>
								{divCity.divisions.map((division) => {
									const isDivisionJoined = userDivisions.find(
										(userDiv) => userDiv === division._id
									);
									console.log("isDivisionJoined:", isDivisionJoined);
									return (
										<>
											{isDivisionJoined && isDivisionJoined !== "" ? (
												<div key={division._id}>
													<Card className="my-4 flex items-center justify-between">
														<CardHeader>
															<CardTitle>{division.divisionName}</CardTitle>
															<CardDescription className="flex flex-col gap-4">
																<div className="flex items-center gap-2">
																	<svg
																		width="20"
																		height="20"
																		viewBox="0 0 24 24"
																		stroke="#ff422d"
																	>
																		<path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" />
																	</svg>
																	<p className="text-lg">{division.location}</p>
																</div>
																<p className="text-sm">
																	{division.description}
																</p>
															</CardDescription>
														</CardHeader>
														<div className="pr-5">
															<p className="text-primary text-4xl font-semibold uppercase">
																Joined
															</p>
														</div>
													</Card>
												</div>
											) : (
												<Link
													key={division._id}
													href={`/register/create-team/${division._id}`}
												>
													<Card className="my-4 flex items-center justify-between">
														<CardHeader>
															<CardTitle>{division.divisionName}</CardTitle>
															<CardDescription className="flex flex-col gap-4">
																<div className="flex items-center gap-2">
																	<svg
																		width="20"
																		height="20"
																		viewBox="0 0 24 24"
																		stroke="#ff422d"
																	>
																		<path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" />
																	</svg>
																	<p className="text-lg">{division.location}</p>
																</div>
																<p className="text-sm">
																	{division.description}
																</p>
															</CardDescription>
														</CardHeader>
														<div className="pr-5">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="20"
																height="17"
																viewBox="0 0 20 17"
																fill="none"
															>
																<path
																	d="M11.5 1L19 8.5M19 8.5L11.5 16M19 8.5H1"
																	stroke="#D1D5DB"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																/>
															</svg>
														</div>
													</Card>
												</Link>
											)}
										</>
									);
								})}
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</>
	);
};

export default CreateYourTeam;
