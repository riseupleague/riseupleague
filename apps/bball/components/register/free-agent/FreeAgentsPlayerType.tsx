"use client";

import BackButton from "@/components/general/buttons/BackButton";
import { Button } from "@ui/components/button";
import { useState } from "react";
import FreeAgentsSummary from "./FreeAgentsSummary";
import { Input } from "@ui/components/input";

const FreeAgentsPlayerType = ({ city }): JSX.Element => {
	const rating = new Array(5).fill("");
	const positions = ["Guard", "Forward", "Center"];
	const [heightConfirmed, setHeightConfirmed] = useState(false);

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

	const playerSkillsSum =
		skills.shooting +
		skills.dribbling +
		skills.defense +
		skills.fitness +
		skills.understanding +
		skills.years;

	const handleSetSkills = (skill, rating) => {
		setSkills({ ...skills, [skill]: rating });
	};

	const handleHeightChange = (e) => {
		const { value } = e.target;
		const regex = /^[0-9'"]*$/;

		if (regex.test(value)) setSkills({ ...skills, height: value });
	};

	return (
		<div>
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
					<p className="text-xl uppercase">Select your preferred position</p>

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
					className={`${heightConfirmed && "hidden"} flex flex-col items-center gap-8 rounded border border-neutral-600 bg-neutral-800 py-8`}
				>
					<h4 className="m-0 text-neutral-400">8/8</h4>
					<p className="text-xl uppercase">
						Enter your height (only numbers and apostraphes)
					</p>

					<div className="flex gap-2">
						<Input
							placeholder="ie. 5'9"
							className="border border-neutral-600 bg-neutral-800 p-6 text-xl"
							value={skills.height}
							onChange={handleHeightChange}
						/>
						<Button
							disabled={skills.height === null || skills.height.length === 0}
							onClick={() => setHeightConfirmed(true)}
						>
							Continue
						</Button>
					</div>
				</div>
			)}

			{heightConfirmed && <FreeAgentsSummary skills={skills} city={city} />}
		</div>
	);
};

export default FreeAgentsPlayerType;
