"use client";

import BackButton from "@/components/general/buttons/BackButton";
import { Button } from "@ui/components/button";
import { useState } from "react";
import FreeAgentsSummary from "./FreeAgentsSummary";
import { Input } from "@ui/components/input";

const FreeAgentsPlayerType = ({ city, divisionPricePurposes }): JSX.Element => {
	const rating = new Array(5).fill("");
	const positions = ["Guard", "Forward", "Center"];
	const [isWrongHeight, setIsWrongHeight] = useState(false);
	const [heightConfirmed, setHeightConfirmed] = useState(false);
	const [height, setHeight] = useState("");
	const [skills, setSkills] = useState({
		shooting: null,
		dribbling: null,
		defense: null,
		fitness: null,
		understanding: null,
		years: null,
		position: null,
		height: "",
	});

	const handleSetSkills = (skill, rating) => {
		setSkills({ ...skills, [skill]: rating });
	};

	const handleHeightChange = () => {
		// Test the function with an example input
		const validatedHeight = validateHeight(height);
		if (validatedHeight.isValid) {
			setSkills({ ...skills, height: height });
			setHeightConfirmed(true);
			setIsWrongHeight(false);
		} else {
			setIsWrongHeight(true);
			setHeightConfirmed(false);
		}
	};

	const handleReturnPlayerType = () => {
		setHeightConfirmed(false);
		setSkills({
			shooting: null,
			dribbling: null,
			defense: null,
			fitness: null,
			understanding: null,
			years: null,
			position: null,
			height: "",
		});
	};

	function validateHeight(input) {
		// Regular expression to match feet and inches format (e.g., 5'9")
		const regex = /^(?=.*\d)[\d']{1,3}(?:[ ]?[0-9]+")?$/;

		// Check if the input matches the regex pattern
		if (regex.test(input)) {
			// Split the input into feet and inches
			const [feet, inches] = input
				.split("'")
				.map((part) => parseInt(part.trim()));

			// Check if both feet and inches are valid numbers
			if (!isNaN(feet) && !isNaN(inches)) {
				// Convert inches to feet if it's greater than or equal to 12
				if (inches >= 12) {
					const totalFeet = feet + Math.floor(inches / 12);
					const remainingInches = inches % 12;
					return {
						isValid: true,
						message: `${totalFeet}'${remainingInches}"`,
					};
				} else {
					return {
						isValid: true,
						message: `${feet}'${inches}"`,
					};
				}
			}
		}
		// Return an error message if the input is not in the correct format
		return {
			isValid: false,
			message: "Please enter the height in the correct format (e.g., 5'9\")",
		};
	}

	return (
		<div>
			{!heightConfirmed && (
				<>
					<BackButton href="/register/free-agent" />

					{skills.years === null && (
						<h3 className="mb-12 mt-10 text-3xl font-normal uppercase">
							what type of player are you?
						</h3>
					)}

					{/* shooting */}
					{skills.shooting === null && (
						<div className="flex flex-col items-center gap-8 rounded border border-neutral-600 bg-neutral-800 py-8">
							<h4 className="m-0 text-neutral-400">1/8</h4>
							<p className="text-xl uppercase">Rate your shooting accuracy</p>

							<div className="space-x-2.5">
								{rating.map((_, index) => (
									<Button
										className="size-[52px] rounded bg-neutral-500 p-3 text-xl font-normal text-white transition-all hover:bg-neutral-400 sm:size-[75px] sm:p-6"
										onClick={() => handleSetSkills("shooting", index + 1)}
										key={index}
									>
										{index + 1}
									</Button>
								))}
							</div>
						</div>
					)}

					{/* dribbling */}
					{skills.shooting !== null && (
						<div
							className={`${skills.dribbling !== null && "hidden"} flex flex-col items-center gap-8 rounded border border-neutral-600 bg-neutral-800 py-8`}
						>
							<h4 className="m-0 text-neutral-400">2/8</h4>
							<p className="text-xl uppercase">Rate your dribbling skills</p>

							<div className="space-x-2.5">
								{rating.map((_, index) => (
									<Button
										className="size-[52px] rounded bg-neutral-500 p-3 text-xl font-normal text-white transition-all hover:bg-neutral-400 sm:size-[75px] sm:p-6"
										onClick={() => handleSetSkills("dribbling", index + 1)}
										key={index}
									>
										{index + 1}
									</Button>
								))}
							</div>
						</div>
					)}

					{/* defense */}
					{skills.dribbling !== null && (
						<div
							className={`${skills.defense !== null && "hidden"} flex flex-col items-center gap-8 rounded border border-neutral-600 bg-neutral-800 py-8`}
						>
							<h4 className="m-0 text-neutral-400">3/8</h4>
							<p className="text-xl uppercase">Rate your defensive skills</p>

							<div className="space-x-2.5">
								{rating.map((_, index) => (
									<Button
										className="size-[52px] rounded bg-neutral-500 p-3 text-xl font-normal text-white transition-all hover:bg-neutral-400 sm:size-[75px] sm:p-6"
										onClick={() => handleSetSkills("defense", index + 1)}
										key={index}
									>
										{index + 1}
									</Button>
								))}
							</div>
						</div>
					)}

					{/* fitness */}
					{skills.defense !== null && (
						<div
							className={`${skills.fitness !== null && "hidden"} flex flex-col items-center gap-8 rounded border border-neutral-600 bg-neutral-800 py-8`}
						>
							<h4 className="m-0 text-neutral-400">4/8</h4>
							<p className="text-xl uppercase">Rate your overall fitness</p>

							<div className="space-x-2.5">
								{rating.map((_, index) => (
									<Button
										className="size-[52px] rounded bg-neutral-500 p-3 text-xl font-normal text-white transition-all hover:bg-neutral-400 sm:size-[75px] sm:p-6"
										onClick={() => handleSetSkills("fitness", index + 1)}
										key={index}
									>
										{index + 1}
									</Button>
								))}
							</div>
						</div>
					)}

					{/* understanding */}
					{skills.fitness !== null && (
						<div
							className={`${skills.understanding !== null && "hidden"} flex flex-col items-center gap-8 rounded border border-neutral-600 bg-neutral-800 py-8`}
						>
							<h4 className="m-0 text-neutral-400">5/8</h4>
							<p className="text-xl uppercase">
								Rate your understanding of the game
							</p>

							<div className="space-x-2.5">
								{rating.map((_, index) => (
									<Button
										className="size-[52px] rounded bg-neutral-500 p-3 text-xl font-normal text-white transition-all hover:bg-neutral-400 sm:size-[75px] sm:p-6"
										onClick={() => handleSetSkills("understanding", index + 1)}
										key={index}
									>
										{index + 1}
									</Button>
								))}
							</div>
						</div>
					)}

					{/* years */}
					{skills.understanding !== null && (
						<div
							className={`${skills.years !== null && "hidden"} flex flex-col items-center gap-8 rounded border border-neutral-600 bg-neutral-800 py-8`}
						>
							<h4 className="m-0 text-neutral-400">6/8</h4>
							<p className="text-xl uppercase">
								number of years playing basketball
							</p>

							<div className="space-x-2.5">
								{rating.map((_, index) => (
									<Button
										className="size-[52px] rounded bg-neutral-500 p-3 text-xl font-normal text-white transition-all hover:bg-neutral-400 sm:size-[75px] sm:p-6"
										onClick={() => handleSetSkills("years", index + 1)}
										key={index}
									>
										{index + 1}
										{index === 4 && "+"}
									</Button>
								))}
							</div>
						</div>
					)}

					{/* position */}
					{skills.years !== null && (
						<div
							className={`${skills.position !== null && "hidden"} flex flex-col items-center gap-8 rounded border border-neutral-600 bg-neutral-800 py-8`}
						>
							<h4 className="m-0 text-neutral-400">7/8</h4>
							<p className="text-xl uppercase">
								Select your preferred position
							</p>

							<div className="space-x-2.5">
								{positions.map((position, index) => (
									<Button
										className="size-[52px] rounded bg-neutral-500 p-3 text-xl font-normal text-white transition-all hover:bg-neutral-400 sm:size-[75px] sm:p-6"
										onClick={() => handleSetSkills("position", position)}
										key={index}
									>
										{position}
									</Button>
								))}
							</div>
						</div>
					)}

					{/* height */}
					{skills.position !== null && (
						<div
							className={`flex flex-col items-center gap-8 rounded border border-neutral-600 bg-neutral-800 py-8`}
						>
							<h4 className="m-0 text-neutral-400">8/8</h4>
							<p className="text-xl uppercase">
								Enter your height (only numbers and apostraphes)
							</p>

							<div className="flex gap-2">
								<Input
									placeholder="ie. 5'9"
									className="border border-neutral-600 bg-neutral-800 p-6 text-xl"
									value={height}
									onChange={(e) => setHeight(e.target.value)}
								/>
								<Button onClick={handleHeightChange}>Continue</Button>
							</div>
							{isWrongHeight && (
								<p className="text-primary">Height format needs to change.</p>
							)}
						</div>
					)}
				</>
			)}

			{heightConfirmed && (
				<FreeAgentsSummary
					skills={skills}
					city={city}
					onReturnPlayerType={handleReturnPlayerType}
					divisionPricePurposes={divisionPricePurposes}
				/>
			)}
		</div>
	);
};

export default FreeAgentsPlayerType;