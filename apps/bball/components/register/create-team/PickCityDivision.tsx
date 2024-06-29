"use client";

import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { BsArrowRight } from "react-icons/bs";
import { Button } from "@ui/components/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";

const PickCityDivision = ({
	regions,
	userDivisions,
	registerInfo,
	setRegisterInfo,
}: {
	regions: any;
	userDivisions: any;
	registerInfo: any;
	setRegisterInfo: any;
}) => {
	const divisionHandler = (division) => {
		setRegisterInfo({
			...registerInfo,
			step: 2,
			division: division,
			allowStep: {
				1: true,
				2: true,
				3: false,
				4: false,
				5: false,
			},
		});
	};

	return (
		<section>
			<h3>Pick A City & Division</h3>

			{regions?.length > 0 ? (
				<Accordion type="single" collapsible className="w-full">
					{regions?.map((region, index) => (
						<AccordionItem value={`items-${index}`} key={index}>
							<AccordionTrigger className="uppercase">
								<h4>{region.city}</h4>
							</AccordionTrigger>
							<AccordionContent>
								{region.divisions.map((division, index) => {
									const isDivisionJoined = userDivisions.some(
										(div) => div === division._id
									);

									return (
										<Button
											key={index}
											onClick={() => divisionHandler(division)}
											className="relative my-2 flex w-full flex-col items-start rounded border border-neutral-600 bg-[#111827] p-4 text-neutral-100 transition-all hover:bg-neutral-600"
											disabled={division.teams.length >= 8 || isDivisionJoined}
										>
											<h5 className="mb-3">{division.divisionName}</h5>

											<div className="mb-4 flex gap-2">
												<p className="flex items-center gap-1 text-base font-normal">
													<IoLocationOutline className="text-neutral-400" />{" "}
													{division.location}
												</p>
												<p className="flex items-center gap-1 text-base font-normal">
													<CiCalendar className="text-neutral-400" />{" "}
													{division.day}
												</p>
											</div>

											<p className="text-lg font-normal">
												{division.description}
											</p>

											{isDivisionJoined && (
												<div className="absolute right-6 top-1/2">
													<p className="text-primary text-2xl">Joined</p>
												</div>
											)}

											{!isDivisionJoined && (
												<div className="absolute right-6 top-1/2">
													{division.teams.length >= 8 ? (
														<p className="text-primary text-2xl">Full</p>
													) : (
														<BsArrowRight className="size-6 -translate-y-1 text-neutral-300" />
													)}
												</div>
											)}
										</Button>
									);
								})}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			) : (
				<p className="mt-5">
					There are no divisions available. Please come back later.
				</p>
			)}
		</section>
	);
};

export default PickCityDivision;
