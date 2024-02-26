import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/card";
import LocationIcon from "../icons/LocationIcon";
import ClockIcon from "../icons/ClockIcon";
import CalendarRegisterIcon from "../icons/CalendarRegisterIcon";
import { convertMilitaryToRegularTime } from "@/utils/convertMilitaryToRegularTime";

const CreateYourTeam = ({ divisions, user }): JSX.Element => {
	const userDivisions = user.basketball.map((player) => player.division._id);
	return (
		<>
			<Link
				href="/register"
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

			<h3 className="mt-10 text-3xl font-normal uppercase">
				Pick a city & division:
			</h3>

			<Accordion type="single" collapsible className="my-10 w-full">
				{divisions.map((divCity, index) => {
					return (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className="border-neutral-600"
						>
							<AccordionTrigger className="text-2xl capitalize">
								{divCity.city}
							</AccordionTrigger>
							<AccordionContent>
								{divCity.divisions.map((division) => {
									const isDivisionJoined = userDivisions.find(
										(userDiv) => userDiv === division._id
									);

									return (
										<>
											{division.teams.length >= 8 ? (
												<div key={division._id}>
													<Card className="my-4 flex items-center justify-between bg-[#111827]">
														<CardHeader>
															<CardTitle className="text-2xl font-medium capitalize">
																{division.divisionName}
															</CardTitle>
															<CardContent className="flex flex-col gap-4 p-0">
																<div className="flex flex-col items-start gap-2 text-neutral-200 md:flex-row md:items-center">
																	<div className="flex items-center gap-1">
																		<LocationIcon />
																		<p className="text-sm">
																			{division.location}
																		</p>
																	</div>
																	<div className="flex items-center gap-1">
																		<ClockIcon />
																		<p className="text-sm">
																			{convertMilitaryToRegularTime(
																				division.startTime
																			)}{" "}
																			-{" "}
																			{convertMilitaryToRegularTime(
																				division.endTime
																			)}
																		</p>
																	</div>
																	<div className="flex items-center gap-1">
																		<CalendarRegisterIcon />
																		<p className="text-sm">{division.day}</p>
																	</div>
																</div>
																<p className="text-sm md:text-xl">
																	{division.teams.length}
																</p>
																<p className="text-sm md:text-xl">
																	{division.description}
																</p>
															</CardContent>
														</CardHeader>
														<div className="pr-5">
															<p className="text-primary text-4xl font-semibold uppercase">
																Full
															</p>
														</div>
													</Card>
												</div>
											) : (
												<>
													{isDivisionJoined && isDivisionJoined !== "" ? (
														<div key={division._id}>
															<Card className="my-4 flex items-center justify-between bg-[#111827]">
																<CardHeader>
																	<CardTitle className="text-2xl font-medium capitalize">
																		{division.divisionName}
																	</CardTitle>
																	<CardContent className="flex flex-col gap-4 p-0">
																		<div className="flex flex-col items-start gap-2 text-neutral-200 md:flex-row md:items-center">
																			<div className="flex items-center gap-1">
																				<LocationIcon />
																				<p className="text-sm">
																					{division.location}
																				</p>
																			</div>
																			<div className="flex items-center gap-1">
																				<ClockIcon />
																				<p className="text-sm">
																					{convertMilitaryToRegularTime(
																						division.startTime
																					)}{" "}
																					-{" "}
																					{convertMilitaryToRegularTime(
																						division.endTime
																					)}
																				</p>
																			</div>
																			<div className="flex items-center gap-1">
																				<CalendarRegisterIcon />
																				<p className="text-sm">
																					{division.day}
																				</p>
																			</div>
																		</div>

																		<p className="text-sm md:text-xl">
																			{division.description}
																		</p>
																	</CardContent>
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
															<Card className="my-4 flex items-center justify-between bg-[#111827] transition-all hover:bg-neutral-600">
																<CardHeader>
																	<CardTitle className="text-2xl font-medium capitalize">
																		{division.divisionName}
																	</CardTitle>
																	<CardContent className="flex flex-col gap-4 p-0">
																		<div className="flex flex-col items-start gap-2 text-neutral-200 md:flex-row md:items-center">
																			<div className="flex items-center gap-1">
																				<LocationIcon />
																				<p className="text-sm">
																					{division.location}
																				</p>
																			</div>
																			<div className="flex items-center gap-1">
																				<ClockIcon />
																				<p className="text-sm">
																					{convertMilitaryToRegularTime(
																						division.startTime
																					)}{" "}
																					-{" "}
																					{convertMilitaryToRegularTime(
																						division.endTime
																					)}
																				</p>
																			</div>
																			<div className="flex items-center gap-1">
																				<CalendarRegisterIcon />
																				<p className="text-sm">
																					{division.day}
																				</p>
																			</div>
																		</div>

																		<p className="text-sm md:text-xl">
																			{division.description}
																		</p>
																	</CardContent>
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
																			strokeWidth="1.5"
																			strokeLinecap="round"
																			strokeLinejoin="round"
																		/>
																	</svg>
																</div>
															</Card>
														</Link>
													)}
												</>
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
