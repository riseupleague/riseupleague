import { convertMilitaryToRegularTime } from "@/utils/convertMilitaryToRegularTime";
import { Checkbox } from "@ui/components/checkbox";
import { Label } from "@ui/components/label";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/components/button";
import getStripe from "@/utils/checkout";
import { Loader2 } from "lucide-react";
import { saveUnpaidTeam } from "@/actions/saveUnpaidTeam";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/tabs";
import AddFreeAgentNone from "./summary/AddFreeAgentNone";
import AddFreeAgentFalse from "./summary/AddFreeAgentFalse";
import AddFreeAgentTrue from "./summary/AddFreeAgentTrue";
const checkboxSchema = z.object({
	agreeToTerms: z.boolean().refine((val) => val === true, {
		message: "You must agree to the Terms and Conditions",
	}),
	agreeToRefundPolicy: z.boolean().refine((val) => val === true, {
		message: "You must agree to the Refund Policy",
	}),
	receiveNews: z.boolean().optional(),
});

const Summary = ({ registerInfo, setRegisterInfo, user }) => {
	const [isLoader, setIsLoader] = useState(false);
	const [isStripeError, setIsStripeError] = useState(false);
	const [submitType, setSubmitType] = useState("");
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(checkboxSchema),
		defaultValues: {
			agreeToTerms: false,
			agreeToRefundPolicy: false,
			receiveNews: false,
		},
	});

	const onSubmit = async (data: z.infer<typeof checkboxSchema>) => {
		const unpaidTeamObject = {
			...registerInfo,
			checkboxes: data,
		};

		await saveUnpaidTeam(user._id, unpaidTeamObject);

		if (registerInfo?.addFreeAgent === "none") {
			const metadata = {
				status: "createTeam",
				payment: "full",
				email: user.email,
				userId: user._id,
				division: registerInfo?.division._id,
				divisionName: registerInfo?.division.divisionName,
				teamName: registerInfo?.teamDetails?.teamName,
				playerName: registerInfo?.teamCaptainDetails?.playerName,
				instagram: registerInfo?.teamCaptainDetails?.instagram,
				phoneNumber: registerInfo?.teamCaptainDetails?.phoneNumber,
				paid: submitType === "team" ? true : false,
			};
			if (submitType === "player") {
				// Handle player discount submission
				const itemPriceId = registerInfo.division?.earlyBirdOpen
					? registerInfo.division?.earlyBirdId
					: registerInfo.division?.regularPriceFullId;

				redirectToCheckout([{ price: itemPriceId, quantity: 1 }], metadata);
			} else if (submitType === "team") {
				// Handle team discount submission
				const itemPriceId = registerInfo.division?.earlyBirdOpen
					? registerInfo.division?.earlyBirdTeamPriceId
					: registerInfo.division?.regularTeamPriceId;

				redirectToCheckout([{ price: itemPriceId, quantity: 1 }], metadata);
			}
		} else {
			const metadata = {
				status: "createTeam",
				payment: "full",
				email: user.email,
				userId: user._id,
				division: registerInfo?.division._id,
				divisionName: registerInfo?.division.divisionName,
				teamName: registerInfo?.teamDetails?.teamName,
				playerName: registerInfo?.teamCaptainDetails?.playerName,
				instagram: registerInfo?.teamCaptainDetails?.instagram,
				phoneNumber: registerInfo?.teamCaptainDetails?.phoneNumber,

				paid: registerInfo?.addFreeAgent === "false" ? true : false,
			};

			if (registerInfo?.addFreeAgent === "false") {
				// Handle team discount submission
				const itemPriceId = registerInfo.division?.earlyBirdOpen
					? registerInfo.division?.earlyBirdTeamPriceId
					: registerInfo.division?.regularTeamPriceId;

				redirectToCheckout([{ price: itemPriceId, quantity: 1 }], metadata);
			} else if (registerInfo?.addFreeAgent === "true") {
				// Handle player discount submission
				const itemPriceId = registerInfo.division?.earlyBirdOpen
					? registerInfo.division?.earlyBirdId
					: registerInfo.division?.regularPriceFullId;

				redirectToCheckout([{ price: itemPriceId, quantity: 1 }], metadata);
			}
		}
	};

	const onSubmitInstallments = async (data: z.infer<typeof checkboxSchema>) => {
		const unpaidTeamObject = {
			...registerInfo,
			checkboxes: data,
		};
		await saveUnpaidTeam(user._id, unpaidTeamObject);

		const metadata = {
			status: "createTeam",
			payment: "four",
			email: user.email,
			userId: user._id,
			division: registerInfo?.division._id,
			divisionName: registerInfo?.division.divisionName,
			teamName: registerInfo?.teamDetails?.teamName,
			playerName: registerInfo?.teamCaptainDetails?.playerName,
			instagram: registerInfo?.teamCaptainDetails?.instagram,
			phoneNumber: registerInfo?.teamCaptainDetails?.phoneNumber,
			paid: false,
		};

		const itemPriceId = registerInfo.division?.firstInstalmentPriceId;

		redirectToCheckout([{ price: itemPriceId, quantity: 1 }], metadata);
	};
	const redirectToCheckout = async (items, formObject) => {
		try {
			setIsLoader(true);

			const response = await fetch("/api/checkout-sessions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ items, formObject: JSON.stringify(formObject) }),
			});

			if (response.ok) {
				const { session } = await response.json();
				const stripe = await getStripe();
				setIsLoader(false);
				await stripe.redirectToCheckout({ sessionId: session.id });
			} else {
				setIsLoader(false);
				setIsStripeError(true);
				console.error("Failed to create Stripe checkout session:", response);
			}
		} catch (error) {
			console.error("Error creating Stripe checkout session:", error);
		}
	};
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
				{registerInfo.addFreeAgent === "true" && (
					<AddFreeAgentTrue
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						control={control}
						errors={errors}
						registerInfo={registerInfo}
						isLoader={isLoader}
						setSubmitType={setSubmitType}
						onSubmitInstallments={onSubmitInstallments}
					/>
				)}

				{registerInfo.addFreeAgent === "false" && (
					<AddFreeAgentFalse
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						control={control}
						errors={errors}
						registerInfo={registerInfo}
						isLoader={isLoader}
					/>
				)}

				{registerInfo.addFreeAgent === "none" && (
					<AddFreeAgentNone
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						control={control}
						errors={errors}
						registerInfo={registerInfo}
						isLoader={isLoader}
						setSubmitType={setSubmitType}
						onSubmitInstallments={onSubmitInstallments}
					/>
				)}
			</div>
			{isStripeError && (
				<p className="text-2xl text-red-500">
					Something went wrong. Please let us know and we will fix it right
					away.
				</p>
			)}
			<div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
				<h4 className="text-center text-xl uppercase">
					Registration Fee Allocation
				</h4>
				<ul>
					<li className="text-xl">$50 + Tax For Jersey Order</li>
					<li className="text-xl">$50 + Tax For Gym Fees</li>
				</ul>
				<p className="mt-2 flex flex-col text-neutral-200">
					<span>Note: There will be no refunds for this transactions.</span>
					<Link href={"/refund-policy"} target="_blank" className="underline">
						Read Refund Policy
					</Link>
				</p>
			</div>
		</section>
	);
};

export default Summary;
