"use client";

import Link from "next/link";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Button } from "@ui/components/button";
import { useState } from "react";
import CustomizeJersey from "./CustomizeJersey";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";
import BackButton from "@/components/general/buttons/BackButton";

const ChooseTeam = ({ division, session }): JSX.Element => {
	const [isTeamSelected, setIsTeamSelected] = useState(false);
	const [teamCode, setTeamCode] = useState("");
	const [selectedTeamIndex, setSelectedTeamIndex] = useState(null);
	const [selectedTeam, setSelectedTeam] = useState({});
	const [codeError, setCodeError] = useState("");

	const handleTeamSelected = () => {
		const teamSelected = division.teams[selectedTeamIndex];
		setSelectedTeam({
			...teamSelected,
			season: division.season,
			division: division._id,
		});
		if (teamSelected.teamCode === teamCode) {
			setIsTeamSelected(true);
			window.scrollTo({
				top: 0,
				behavior: "smooth", // This enables smooth scrolling
			});
		} else {
			setCodeError("Wrong code!");
		}
	};

	return (
		<>
			{!isTeamSelected ? (
				<>
					{division.teams?.length === 0 ? (
						<>
							<BackButton href={"/register/join-team"} />

							<h3 className="mt-20  text-3xl uppercase">
								No teams have been created in this division yet.
							</h3>
						</>
					) : (
						<>
							<BackButton href={"/register/join-team"} />

							<h3 className="mt-10 text-3xl font-medium uppercase">
								Choose your team:
							</h3>

							<div className="mt-10 flex flex-col gap-10 ">
								<Accordion type="single" collapsible className="w-full">
									{division.teams?.map((team, index) => {
										return (
											<AccordionItem
												key={team.teamName}
												value={`item-${index}]`}
												className="border-b-0"
											>
												<AccordionTrigger
													className=" flex-col items-start gap-3 rounded-md rounded-b-none bg-neutral-700 px-[16px] py-[26px] "
													noArrow={true}
													onClick={() => setSelectedTeamIndex(index)}
												>
													<p className="text-2xl">{team.teamName}</p>
													<div className="flex w-full items-center justify-between">
														<div className="flex items-center justify-between gap-2">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="18"
																height="18"
																viewBox="0 0 18 18"
																fill="none"
															>
																<path
																	d="M11.8 5.5002C11.8 7.04659 10.5464 8.3002 8.99998 8.3002C7.45358 8.3002 6.19998 7.04659 6.19998 5.5002C6.19998 3.9538 7.45358 2.7002 8.99998 2.7002C10.5464 2.7002 11.8 3.9538 11.8 5.5002Z"
																	stroke="#E5E5E5"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
																<path
																	d="M8.99998 10.4002C6.29378 10.4002 4.09998 12.594 4.09998 15.3002H13.9C13.9 12.594 11.7062 10.4002 8.99998 10.4002Z"
																	stroke="#E5E5E5"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
															<div className="flex gap-1">
																<span>{team.players.length}</span>/
																<span>10</span>
															</div>
														</div>
														<div>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="20"
																height="20"
																viewBox="0 0 20 20"
																fill="none"
															>
																<path
																	fill-rule="evenodd"
																	clip-rule="evenodd"
																	d="M5.625 9.125V7.375C5.625 4.95875 7.58375 3 10 3C12.4162 3 14.375 4.95875 14.375 7.375V9.125C15.3415 9.125 16.125 9.9085 16.125 10.875V15.25C16.125 16.2165 15.3415 17 14.375 17H5.625C4.6585 17 3.875 16.2165 3.875 15.25V10.875C3.875 9.9085 4.6585 9.125 5.625 9.125ZM12.625 7.375V9.125H7.375V7.375C7.375 5.92525 8.55025 4.75 10 4.75C11.4497 4.75 12.625 5.92525 12.625 7.375Z"
																	fill="#555B64"
																/>
															</svg>
														</div>
													</div>
												</AccordionTrigger>
												<AccordionContent>
													<div className="rounded-md rounded-t-none bg-neutral-700">
														<section className="flex flex-col rounded-md bg-neutral-700 px-3 py-6">
															<Label className="mb-3 uppercase">
																Team Code
															</Label>
															<span className="mb-1 text-xs text-neutral-500">
																Your team captain has the code
															</span>
															<Input
																type="text"
																className="border-neutral-500 bg-neutral-700 py-[16px]"
																placeholder="Enter Your Team Code"
																value={teamCode}
																onChange={(e) => setTeamCode(e.target.value)}
															/>
															{/* {codeError !== "" &&
									selectedTeam.teamName === team.teamName && (
										<p className="text-primary mt-1">{codeError}</p>
									)} */}
															<Button
																onClick={handleTeamSelected}
																className="mt-12"
															>
																Enter Code
															</Button>
														</section>
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
			) : (
				<CustomizeJersey
					team={selectedTeam}
					session={session}
					division={division}
				/>
			)}
		</>
	);
};

export default ChooseTeam;
