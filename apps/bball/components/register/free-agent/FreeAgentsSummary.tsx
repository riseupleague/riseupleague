"use client";

import LocationIcon from "@/components/icons/LocationIcon";
import { Input } from "@ui/components/input";
import { Separator } from "@ui/components/separator";

const FreeAgentsSummary = ({ skillsSum, city }): JSX.Element => {
	const division = determineDivision(skillsSum, city);

	return (
		<div className="mt-10 flex gap-12">
			<div className="w-2/3">
				<h3 className="mb-6">Summary</h3>
				<Separator className="border-b border-[#374151]" />

				<div className="flex py-6">
					<div className="w-1/4">img</div>
					<div className="w-3/4">
						<h4 className="mb-4 text-2xl capitalize">
							Joining As A Free Agent
						</h4>

						<div className="mb-6 flex items-center gap-2">
							<span className="translate-y-[2px]">
								<LocationIcon />
							</span>
							<p className="text-xl capitalize">{city}</p>
						</div>

						<p className="mb-9 text-xl">
							Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							vulputate libero et velit interdum, ac aliquet odio mattis. Class
							aptent taciti sociosqu ad litora torquent per conubia nostra, per
							inceptos himenaeos.
						</p>

						<p className="text-right">Registration Fee: $210.00</p>
					</div>
				</div>
			</div>

			<div className="w-1/3">
				<div className="w-full rounded bg-[#111827] px-4 py-6">
					<p className="mb-4 text-base">Please Fill In The Details</p>

					<Separator className="mb-4 border-b border-[#1F2937]" />

					<p className="mb-4 text-base uppercase">Top 3 Jersey Numbers</p>

					<div className="space-y-3">
						<Input
							placeholder="ie. 1"
							className="border border-[#D1D5DB] bg-[#111827]"
						/>
						<Input
							placeholder="ie. 2"
							className="border border-[#D1D5DB] bg-[#111827]"
						/>
						<Input
							placeholder="ie. 3"
							className="border border-[#D1D5DB] bg-[#111827]"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const determineDivision = (skillsSum, city) => {
	if (skillsSum < 15) return "Beginner";
	else if (skillsSum >= 15 && skillsSum < 23) {
		if (city.toLowerCase() === "markham") return "Great";
		return "Intermediate";
	} else if (skillsSum >= 23 && skillsSum < 29) {
		if (city.toLowerCase() === "vaughan") return "Intermediate";
		return "Great";
	} else if (skillsSum >= 29) return "Elite";
};

export default FreeAgentsSummary;
