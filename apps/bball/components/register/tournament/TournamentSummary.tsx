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

const checkboxSchema = z.object({
	agreeToTerms: z.boolean().refine((val) => val === true, {
		message: "You must agree to the Terms and Conditions",
	}),
	agreeToRefundPolicy: z.boolean().refine((val) => val === true, {
		message: "You must agree to the Refund Policy",
	}),
	receiveNews: z.boolean().optional(),
});

const TournamentSummary = ({
	registerInfo,
	setRegisterInfo,
	isRiseUpCustomer,
	user,
}) => {
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
		const metadata = {
			payment: "full",
			status: "tournament",
			email: user.email,
			userId: user._id,
			division: registerInfo?.division._id,
			tournament: registerInfo?.division.tournament,
			level: registerInfo?.division.level,
			teamName: registerInfo?.teamDetails?.teamName,
			teamNameShort: registerInfo?.teamDetails?.teamNameShort,
			playerName: registerInfo?.teamCaptainDetails?.playerName,
			instagram: registerInfo?.teamCaptainDetails?.instagram,
			phoneNumber: registerInfo?.teamCaptainDetails?.phoneNumber,
		};

		redirectToCheckout(
			[
				{
					price: isRiseUpCustomer
						? registerInfo.price.riseUpDiscountPriceId
						: registerInfo.price.regularPriceId,
					quantity: 1,
				},
			],
			metadata
		);
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
				<h4 className="mb-5 text-xl uppercase">Team Details</h4>
				<ul>
					<li className="text-lg capitalize">
						Team Name: {registerInfo.teamDetails?.teamName}
					</li>
					<li className="text-lg capitalize">
						Team Captain: {registerInfo.teamCaptainDetails?.playerName}
					</li>
					<li className="text-lg capitalize">
						Division: {registerInfo.division?.tournamentDivisionName}
					</li>
					<li className="text-lg capitalize">
						Skill Level: {registerInfo.teamDetails?.tournamentLevel}
					</li>
					<li className="text-lg capitalize">
						Location: {registerInfo.division?.location}
					</li>
				</ul>
			</div>
			{/* <div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
				<h4 className="mb-5 text-xl uppercase">Roster</h4>
				<ul className="grid grid-cols-1 gap-3  md:grid-cols-2">
					<li>
						<p>Team Captain:: {registerInfo.teamCaptainDetails?.playerName}</p>
						<p>Jersey Name: {registerInfo.teamCaptainDetails?.jerseyName}</p>
						<p>
							Jersey Number: {registerInfo.teamCaptainDetails?.jerseyNumber}
						</p>
						<p>Jersey Size: {registerInfo.teamCaptainDetails?.jerseySize}</p>
					</li>
					{registerInfo?.roster.map((player) => (
						<li key={player.id}>
							<p>
								Player {player.id}: {player.name}
							</p>
							<p>Custom Jersey Name: {player.jerseyName}</p>
							<p>Jersey Number: {player.jerseyNumber}</p>
							<p>Jersey Size: {player.jerseySize}</p>
						</li>
					))}
				</ul>
				<p className="mt-10 text-xl font-semibold">
					Total Players: {registerInfo?.roster?.length + 1}
				</p>
			</div> */}

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
					<h4 className="mb-5 text-xl uppercase">Payment</h4>
					<p className="text-lg"> Please Check All Boxes Before Proceeding</p>
					<div className="my-2 flex items-center">
						<Controller
							name="agreeToTerms"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxTerms"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
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
					{errors.agreeToTerms && (
						<p className="text-red-600">{errors.agreeToTerms.message}</p>
					)}
					<div className="my-2 flex items-center">
						<Controller
							name="agreeToRefundPolicy"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxRefund"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
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
					{errors.agreeToRefundPolicy && (
						<p className="text-red-600">{errors.agreeToRefundPolicy.message}</p>
					)}
					<div className="my-2 flex items-center">
						<Controller
							name="receiveNews"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxNews"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<Label
							htmlFor="checkBoxNews"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							I want to receive emails for the latest news about Rise Up.
						</Label>
					</div>

					{isRiseUpCustomer ? (
						<div className="mt-10">
							<p className="text-xl">Total Price:</p>
							<p className="text-red-500 line-through">
								${registerInfo.price.regularPrice}
							</p>

							<p className="text-2xl font-semibold">
								${registerInfo.price.riseUpDiscountPrice}{" "}
								<span className="text-lg">+ tax</span>
							</p>
							<p>Rise up discount!</p>
						</div>
					) : (
						<div className="mt-10">
							<p className="text-xl">Total Price:</p>

							<p className="text-2xl font-semibold">
								${registerInfo.price.regularPrice}{" "}
								<span className="text-lg">+ tax</span>
							</p>
						</div>
					)}
				</div>
				<div className="mt-4 flex justify-between">
					<Button
						variant="secondary"
						onClick={() => setRegisterInfo({ ...registerInfo, step: 2 })}
					>
						Back
					</Button>
					<Button type="submit">Proceed to checkout</Button>
				</div>
			</form>
			{isStripeError && (
				<p className="text-2xl text-red-500">
					Something went wrong. Please let us know and we will fix it right
					away.
				</p>
			)}
		</section>
	);
};

export default TournamentSummary;
