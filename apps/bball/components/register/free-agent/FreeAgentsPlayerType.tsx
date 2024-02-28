"use client";

import BackButton from "@/components/general/buttons/BackButton";
import { Button } from "@ui/components/button";
import { useState } from "react";
import FreeAgentsSummary from "./FreeAgentsSummary";

const FreeAgentsPlayerType = ({ city }): JSX.Element => {
	const rating = new Array(5).fill("");
	const [skills, setSkills] = useState({
		shooting: null,
		dribbling: null,
		defense: null,
		fitness: null,
		understanding: null,
		years: null,
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
					<h4 className="m-0 text-neutral-400">1/6</h4>
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
					<h4 className="m-0 text-neutral-400">2/6</h4>
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
					<h4 className="m-0 text-neutral-400">3/6</h4>
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
					<h4 className="m-0 text-neutral-400">4/6</h4>
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
					<h4 className="m-0 text-neutral-400">5/6</h4>
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
					<h4 className="m-0 text-neutral-400">6/6</h4>
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

			{skills.years !== null && (
				<FreeAgentsSummary skillsSum={playerSkillsSum} city={city} />
			)}
		</div>
	);
};

export default FreeAgentsPlayerType;
