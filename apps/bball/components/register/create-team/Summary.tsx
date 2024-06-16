import { convertMilitaryToRegularTime } from "@/utils/convertMilitaryToRegularTime";
import { Checkbox } from "@ui/components/checkbox";
import { Label } from "@ui/components/label";
import Link from "next/link";
import React from "react";

const Summary = ({ registerInfo, setRegisterInfo }) => {
	convertMilitaryToRegularTime;
	return (
		<section>
			<h3>Summary</h3>
			<div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
				<h4 className="text-center text-xl uppercase">Team Summary</h4>
				<ul>
					<li className="text-lg">
						Team Name: {registerInfo.teamDetails?.teamName}
					</li>
					<li className="text-lg">
						Team Captain: {registerInfo.teamCaptainDetails?.playerName}
					</li>
					<li className="text-lg">
						Division: {registerInfo.division?.divisionName}
					</li>

					<li className="text-lg">
						Location: {registerInfo.division?.location}
					</li>
					<li className="text-lg">
						Game Time:{" "}
						{registerInfo.division?.startTime === "00:00"
							? "TBD"
							: `${convertMilitaryToRegularTime(registerInfo.division?.startTime)} - ${convertMilitaryToRegularTime(registerInfo.division?.endTime)}`}
						<p className="text-sm text-neutral-200">
							Game times are subject to change
						</p>
					</li>
					<li className="text-lg">Game Day: {registerInfo.division?.day}</li>
					{registerInfo?.addFreeAgent === "none" ? (
						""
					) : registerInfo?.addFreeAgent === "true" ? (
						<li className="text-lg">Add Free Agents: Yes</li>
					) : (
						<li className="text-lg">
							Add Free Agents: No, I will pay the team discount.
						</li>
					)}
				</ul>
			</div>
			<div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
				<h4 className="text-center text-xl uppercase">
					Registration Fee Allocation
				</h4>

				<ul>
					<li className="text-xl"> $45 + Tax For Jersey Order</li>

					<li className="text-xl"> $45 + Tax For Gym Fees</li>
				</ul>
				<p className="mt-2 flex flex-col text-neutral-200">
					<span>Note: There will be no refunds for this transactions.</span>
					<Link href={"/refund-policy"} target="_blank" className="underline">
						Read Refund Policy
					</Link>
				</p>
			</div>

			<div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
				<h4 className="text-center text-xl uppercase">Payment</h4>

				<p className="text-lg"> Please Check All Boxes Before Proceeding</p>
				<div className="my-2 flex items-center">
					<Checkbox
						id="checkBoxTerms"
						className="!mr-4 border-white"
						checked={true}
					/>
					<Label
						htmlFor="checkBoxTerms"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						I have read and agree to the{" "}
						<Link
							className="text-primary transition-all hover:underline"
							href="/terms-and-conditions"
							target="_blank"
						>
							Terms and Conditions
						</Link>
						.
					</Label>
				</div>
				<div className="my-2 flex items-center">
					<Checkbox
						id="checkBoxRefund"
						className="!mr-4 border-white"
						checked={true}
					/>
					<Label
						htmlFor="checkBoxRefund"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						I have read and agree to the{" "}
						<Link
							className="text-primary transition-all hover:underline"
							href="/refund-policy"
							target="_blank"
						>
							Refund Policy
						</Link>
						.
					</Label>
				</div>
				<div className="my-2 flex items-center">
					<Checkbox
						id="checkBoxRefund"
						className="!mr-4 border-white"
						checked={true}
					/>
					<Label
						htmlFor="checkBoxRefund"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						I want to receive emails for latest news about Rise Up .
					</Label>
				</div>
			</div>
		</section>
	);
};

export default Summary;
