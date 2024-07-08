import { Button } from "@ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@ui/components/card";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";

import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { BsArrowRight } from "react-icons/bs";
const TournamentSelection = ({
	onDivision,
	targetRef,
	selections,
	userDivisions,
}) => {
	const [selectionStep, setSelectionStep] = useState(1);
	const [city, setCity] = useState({
		city: "",
		divisions: [],
	});
	const [division, setDivision] = useState({
		division: "",
		levels: [],
	});
	const handleCity = (city) => {
		const selectedCityAndDivisions = selections.find(
			(selection) => selection.city === city
		);
		console.log(selectedCityAndDivisions);
		setCity(selectedCityAndDivisions);
		setSelectionStep(2);
	};
	const handleDivision = (div) => {
		const selectedDivision = city.divisions.find(
			(selectedDiv) => selectedDiv.division === div
		);
		setDivision(selectedDivision);
		setSelectionStep(3);
	};
	return (
		<div ref={targetRef} className="container mx-auto mt-20">
			{selectionStep === 1 && (
				<>
					<p className="font-abolition mt-20 text-center text-2xl md:text-4xl">
						Choose your city
					</p>

					<div className="my-20">
						{selections.map((region) => (
							<Button
								key={region.city}
								className="relative my-2 flex w-full flex-col items-start rounded border border-neutral-600 bg-[#111827] p-4 text-neutral-100 transition-all hover:bg-neutral-600"
								onClick={() => handleCity(region.city)}
							>
								<h3 className="mb-3">{region.city}</h3>
							</Button>
						))}
					</div>
				</>
			)}

			{selectionStep === 2 && (
				<>
					<p className="font-abolition mt-20 text-center text-2xl md:text-4xl">
						Choose your division
					</p>

					<div className="my-20">
						{city.divisions.map((div) => (
							<Button
								key={div.division}
								className="relative my-2 flex w-full flex-col items-start rounded border border-neutral-600 bg-[#111827] p-4 text-neutral-100 transition-all hover:bg-neutral-600"
								onClick={() => handleDivision(div.division)}
							>
								<h3 className="mb-3">{div.division}</h3>
							</Button>
						))}
					</div>
					<div className="mt-4 flex justify-between">
						<Button variant="secondary" onClick={() => setSelectionStep(1)}>
							Back
						</Button>
					</div>
				</>
			)}
			{selectionStep === 3 && (
				<>
					<p className="font-abolition mt-20 text-center text-2xl md:text-4xl">
						Choose your level
					</p>

					<div className="my-20">
						{division.levels.map((level) => (
							<Button
								key={level.level}
								className="relative my-2 flex w-full flex-col items-start rounded border border-neutral-600 bg-[#111827] p-4 text-neutral-100 transition-all hover:bg-neutral-600"
								onClick={() => onDivision(level.division._id)}
							>
								<h3 className="mb-3">{level.level}</h3>
							</Button>
						))}
					</div>
					<div className="mt-4 flex justify-between">
						<Button variant="secondary" onClick={() => setSelectionStep(2)}>
							Back
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

const cardData = [
	{
		title: "All Asians",
		description: "Calling all Asians!",
		imgSrc: "/images/register/joinFreeAgent.jpg",
		imgAlt: "register all asians",
		// btnText: "Join as a free agent Now",
		btnText: "Register Now",
		href: "/register/tournament/668b52fa213d8d22854befd8",
		_id: "668b52fa213d8d22854befd8",
	},
	{
		title: "All man`s under 6ft",
		description: "Calling all guards!",
		imgSrc: "/images/register/createTeam.jpg",
		imgAlt: "Create a team now",
		btnText: "Register Now",
		href: "/register/tournament/all-nations",
		_id: "all-mans-under-6ft",
	},
	{
		title: "All Nations",
		description: "Calling all hoopers",
		imgSrc: "/images/register/joinTeam.jpg",
		imgAlt: "join as a free agent photo",
		btnText: "Register Now",
		href: "/register/tournament/all-mans-under-six-feet",
		_id: "all-nations",
	},
];

export default TournamentSelection;
