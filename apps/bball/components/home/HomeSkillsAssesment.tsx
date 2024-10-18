"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@ui/components/slider";
import { Button } from "@ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@ui/components/card";
import {
	Trophy,
	Clock,
	Flame,
	ChevronRight,
	Minus,
	Plus,
	Dumbbell,
} from "lucide-react";
import Link from "next/link";

const HomeSkillsAssesment = (): JSX.Element => {
	const [skillLevel, setSkillLevel] = useState(5);
	const [yearsPlayed, setYearsPlayed] = useState(5);
	const [competitiveness, setCompetitiveness] = useState(5);
	const [division, setDivision] = useState("");

	const updateValue = (
		setter: React.Dispatch<React.SetStateAction<number>>,
		value: number,
		change: number
	) => {
		setter((prevValue) => Math.max(0, Math.min(10, prevValue + change)));
	};

	useEffect(() => {
		const total = skillLevel + yearsPlayed + competitiveness;
		if (total <= 7) {
			setDivision("BEGINNER");
		} else if (total <= 15) {
			setDivision("INTERMEDIATE");
		} else if (total <= 23) {
			setDivision("GREAT");
		} else {
			setDivision("ELITE");
		}
	}, [skillLevel, yearsPlayed, competitiveness]);

	const divisionDescriptions = {
		BEGINNER:
			"Perfect for free agents new to the game or looking for a casual, fun-filled basketball experience.",
		INTERMEDIATE:
			"Ideal for solo players with some experience, seeking a balance of competition and enjoyment.",
		GREAT:
			"For skilled individual players ready to challenge themselves and compete at a higher level.",
		ELITE:
			"For highly skilled free agents seeking intense competition and a top-tier basketball experience.",
	};

	const sliderConfig = [
		{
			label: "Basketball Skill Level",
			value: skillLevel,
			setter: setSkillLevel,
			icon: Dumbbell,
		},
		{
			label: "Years Played",
			value: yearsPlayed,
			setter: setYearsPlayed,
			icon: Clock,
		},
		{
			label: "Competitiveness",
			value: competitiveness,
			setter: setCompetitiveness,
			icon: Flame,
		},
	];

	return (
		<Card className="border-primary mx-auto w-full overflow-hidden lg:w-1/2">
			<CardHeader className=" text-white">
				<CardTitle className="text-2xl font-bold">
					Find Your Perfect Division
				</CardTitle>
				<CardDescription className="text-white/80">
					Solo player? No problem! Adjust the sliders to find your ideal match.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6 p-6">
				{sliderConfig.map((item) => (
					<motion.div
						key={item.label}
						className="space-y-2"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<div className="flex items-center justify-between">
							<label className="flex items-center gap-2 text-sm font-medium">
								<item.icon className="h-5 w-5" />
								{item.label}
							</label>
							<div className="flex items-center space-x-2">
								<Button
									variant="outline"
									size="icon"
									className="h-8 w-8 rounded-full"
									onClick={() => updateValue(item.setter, item.value, -1)}
								>
									<Minus className="h-4 w-4" />
								</Button>
								<span className="w-8 text-center font-bold">{item.value}</span>
								<Button
									variant="outline"
									size="icon"
									className="h-8 w-8 rounded-full"
									onClick={() => updateValue(item.setter, item.value, 1)}
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>
						</div>
						<Slider
							value={[item.value]}
							min={0}
							max={10}
							step={1}
							onValueChange={(value) => item.setter(value[0])}
							className="[&_[role=slider]]:bg-primary"
						/>
					</motion.div>
				))}
				<motion.div
					className="mt-6 space-y-4"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
				>
					<h3 className="flex items-center gap-2 text-lg font-semibold">
						<Trophy className=" h-5 w-5" />
						Your Division:
					</h3>
					<div className=" rounded-md p-4 text-white">
						<h4 className="text-primary text-2xl font-bold">{division}</h4>
						<p className="mt-2 text-sm">{divisionDescriptions[division]}</p>
					</div>
					<Button
						asChild
						className="bg-primary w-full text-white hover:bg-[rgb(230,60,41)]"
					>
						<Link href="/register/free-agent">
							Join the League Solo <ChevronRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</motion.div>
			</CardContent>
		</Card>
	);
};

export default HomeSkillsAssesment;
