"use client";

import { useState } from "react";
import { Checkbox } from "@ui/components/checkbox";
import { Label } from "@ui/components/label";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { Loader2 } from "lucide-react";
import getStripe from "@/utils/checkout";
import { Input } from "@ui/components/input";
import { BsArrowRight } from "react-icons/bs";
import { joinTeamSchema } from "@/schemas";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { convertMilitaryToRegularTime } from "@/utils/convertMilitaryToRegularTime";
import { Card, CardContent } from "@ui/components/card";

type PlayerFormValues = z.infer<ReturnType<typeof joinTeamSchema>>;

const JoinTeamSummary = ({ team, session }) => {
	const [playerSelected, setPlayerSelected] = useState({
		_id: "",
		playerName: "",
	});
	const [isLoader, setIsLoader] = useState(false);
	const [isStripeError, setIsStripeError] = useState(false);

	const isTeamEmpty = team.players.length === 0;

	const defaultValues: PlayerFormValues = {
		playerName: "",
		instagram: "",
		phoneNumber: "",
		jerseySize: "",
		jerseyName: "",
		jerseyNumber: "",
		agreeToTerms: false,
		agreeToRefundPolicy: false,
		receiveNews: false,
	};
	console.log("team:", team);

	const existingJerseyNumber = team.players
		.filter((player) => player.jerseyNumber !== undefined)
		.map((player) => player.jerseyNumber.toString());

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<PlayerFormValues>({
		resolver: zodResolver(joinTeamSchema(existingJerseyNumber)),
		defaultValues,
	});

	const onSubmit: SubmitHandler<PlayerFormValues> = (data) => {
		const playerDetails = {
			playerName: data.playerName,
			instagram: data.instagram,
			phoneNumber: data.phoneNumber,
			jerseySize: data.jerseySize,
			jerseyName: data.jerseyName,
			jerseyNumber: data.jerseyNumber,
			agreeToTerms: data.agreeToTerms,
			agreeToRefundPolicy: data.agreeToRefundPolicy,
			receiveNews: data.receiveNews,
		};
		// Add further actions like saving the data or submitting it to an API

		let metadata;

		if (isTeamEmpty) {
			metadata = {
				...playerDetails,
				status: "joinTeam",
				payment: "full",
				email: session.user.email,
				teamCaptain: true,
				division: team?.division._id,
				teamName: team?.teamName,
				team: team?._id,
				divisionName: team?.division?.divisionName,
			};
		} else {
			metadata = {
				...playerDetails,
				status: "joinTeam",
				payment: "full",
				email: session.user.email,
				playerId: playerSelected._id,
				division: team?.division._id,
				teamName: team?.teamName,
				divisionName: team?.division?.divisionName,
			};
		}

		const itemPriceId = team.division?.earlyBirdOpen
			? team.division?.earlyBirdId
			: team.division?.regularPriceId;

		if (team.paid) {
			redirectToCheckout(
				[{ price: team.season.freePrice, quantity: 1 }],
				metadata
			);
		} else {
			redirectToCheckout([{ price: itemPriceId, quantity: 1 }], metadata);
		}
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
		<>
			{!isTeamEmpty ? (
				<>
					{playerSelected._id === "" && (
						<div>
							<h3 className="my-10  text-3xl uppercase">Choose your name:</h3>

							{team.players.map((player) => {
								if (!player.user)
									return (
										<Button
											key={player._id}
											onClick={() => {
												setPlayerSelected(player);
											}}
											className="relative my-1 flex w-full flex-col items-start rounded border border-neutral-600 bg-[#111827] p-4 text-neutral-100 transition-all hover:bg-neutral-600"
										>
											<h5 className="mb-3">{player.playerName}</h5>

											<div className="absolute right-6 top-1/2">
												<BsArrowRight className="size-6 -translate-y-1 text-neutral-300" />
											</div>
										</Button>
									);
							})}
							<Button className="mt-10" variant="secondary" asChild>
								<Link href={"/register/join-team"}>Back</Link>
							</Button>
						</div>
					)}

					{playerSelected._id !== "" && (
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
								<h4 className="text-center text-xl uppercase">Team Summary</h4>
								<ul>
									<li className="text-lg">Team Name: {team.teamName}</li>
									<li className="text-lg">
										Team Captain: {team.teamCaptain?.playerName}
									</li>
									<li className="text-lg">
										Division: {team.division?.divisionName}
									</li>
									<li className="text-lg">
										Location: {team.division?.location}
									</li>
									<li className="text-lg">
										Game Time:{" "}
										{team.division?.startTime === "00:00"
											? "TBD"
											: `${convertMilitaryToRegularTime(team.division?.startTime)} - ${convertMilitaryToRegularTime(team.division?.endTime)}`}
										<p className="text-sm text-neutral-200">
											Game times are subject to change
										</p>
									</li>
									<li className="text-lg">Game Day: {team.division?.day}</li>
								</ul>
							</div>
							<p className="mt-5 text-center text-xl">
								Hello {playerSelected.playerName}, please fill out the rest of
								the form. Thank you.
							</p>
							<div className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] px-4 py-6 md:grid-cols-2">
								<div className="space-y-3">
									<Label htmlFor="playerName" className="text-xl uppercase">
										Full Name
									</Label>
									<Input
										variant="form"
										type="text"
										name="playerName"
										placeholder="Enter your full name"
										{...register("playerName")}
									/>
									{errors.playerName && (
										<p className="text-red-600">{errors.playerName.message}</p>
									)}
								</div>
								<div className="space-y-3">
									<Label htmlFor="instagram" className="text-xl uppercase">
										Instagram
									</Label>
									<Input
										variant="form"
										type="text"
										name="instagram"
										placeholder="Enter your player's name"
										{...register("instagram")}
									/>
									{errors.instagram && (
										<p className="text-red-600">{errors.instagram.message}</p>
									)}
								</div>

								<div className="space-y-3">
									<Label htmlFor="phoneNumber" className="text-xl uppercase">
										Phone Number
									</Label>
									<Input
										variant="form"
										type="text"
										name="phoneNumber"
										placeholder="ex: 123-123-1234"
										{...register("phoneNumber")}
									/>
									{errors.phoneNumber && (
										<p className="text-red-600">{errors.phoneNumber.message}</p>
									)}
									<p className="text-sm text-neutral-300">
										*We will use your phone number if your instagram is not
										available for communication. We would like to keep in
										constant communication with you that way we are always on
										the same page.
									</p>
								</div>

								<div className="space-y-3">
									<label htmlFor="jerseySize" className="text-xl uppercase">
										What is your jersey size?{" "}
										<Link
											href={"/pdf/jersey-size-chart.pdf"}
											className="text-sm lowercase underline"
											target="_blank"
										>
											size guide
										</Link>
									</label>
									<select
										{...register("jerseySize", {
											required: "Jersey size is required",
										})}
										id="jerseySize"
										className="focus:ring-ring ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full items-center rounded-md border border-neutral-300 bg-[#111827] p-4 text-lg font-normal transition-colors file:border-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									>
										<option value="" disabled>
											Select your size
										</option>
										<option value="SM">SM</option>
										<option value="MD">MD</option>
										<option value="LG">LG</option>
										<option value="XL">XL</option>
										<option value="XXL">XXL</option>
										<option value="XXXL">XXXL</option>
										<option value="XXXXL">XXXXL</option>
									</select>
									{errors.jerseySize && (
										<p className="text-red-600">{errors.jerseySize.message}</p>
									)}
									<p className="text-sm text-neutral-300">
										Note: Your jersey size cannot be reordered.{" "}
										<a
											href="#"
											className="underline transition-all hover:text-neutral-100"
										>
											Read more here
										</a>
									</p>
								</div>

								<div className="space-y-3">
									<Label htmlFor="jerseyName" className="text-xl uppercase">
										What’s your custom jersey Name?
									</Label>
									<Input
										variant="form"
										type="text"
										name="jerseyName"
										placeholder="Enter custom jersey name"
										{...register("jerseyName")}
									/>
									{errors.jerseyName && (
										<p className="text-red-600">{errors.jerseyName.message}</p>
									)}
									<p className="text-sm text-neutral-300">
										Please ensure that spelling is correct. This cannot be
										changed later.
									</p>
								</div>
								<div className="space-y-3">
									<Label htmlFor="jerseyNumber" className="text-xl uppercase">
										What’s your Jersey Number?
									</Label>
									<Input
										variant="form"
										type="text"
										name="jerseyNumber"
										placeholder="Enter jersey number"
										{...register("jerseyNumber")}
									/>
									{errors.jerseyNumber && (
										<p className="text-red-600">
											{errors.jerseyNumber.message}
										</p>
									)}
									<p className="text-sm text-neutral-300">
										Please ensure this is the number that your want. This cannot
										be changed later.
									</p>
								</div>
							</div>

							<div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
								<h4 className="text-center text-xl uppercase">
									Registration Fee Allocation
								</h4>
								<ul>
									<li className="text-xl">$50 + Tax For Jersey Order</li>
									<li className="text-xl">$50 + Tax For Gym Fees</li>
								</ul>
								<p className="mt-2 flex flex-col text-neutral-200">
									<span>
										Note: There will be no refunds for this transactions.
									</span>
									<Link
										href={"/refund-policy"}
										target="_blank"
										className="underline"
									>
										Read Refund Policy
									</Link>
								</p>
							</div>

							<div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
								<h4 className="text-center text-xl uppercase">Payment</h4>
								<p className="text-lg">
									{" "}
									Please Check All Boxes Before Proceeding
								</p>
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
									<p className="text-red-600">
										{errors.agreeToRefundPolicy.message}
									</p>
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

								<div className="mt-5">
									<p className="text-xl uppercase">Total:</p>
									{team.paid === true ? (
										<p className="text-2xl font-semibold">Free</p>
									) : (
										<>
											{team.division?.earlyBirdOpen ? (
												<p className="text-2xl font-semibold">
													${team.division?.earlyBirdPrice} + tax
												</p>
											) : (
												<p>${team.division?.regularPrice} + tax</p>
											)}
										</>
									)}
								</div>
								{team.paid === true ? (
									<Button type="submit" className="mt-4 w-full">
										{isLoader ? (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										) : (
											"Join for free"
										)}
									</Button>
								) : (
									<Button type="submit" className="mt-4 w-full">
										{isLoader ? (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										) : (
											"Proceed to checkout"
										)}
									</Button>
								)}
							</div>

							<Button
								onClick={() =>
									setPlayerSelected({
										_id: "",
										playerName: "",
									})
								}
								className="mt-10 w-full"
								variant="secondary"
							>
								Back
							</Button>
						</form>
					)}
				</>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<h3 className="mt-10 text-3xl font-medium uppercase">
						Fill Team Captain Details:
					</h3>
					<div className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] px-4 py-6 md:grid-cols-2">
						<div className="space-y-3">
							<Label htmlFor="playerName" className="text-xl uppercase">
								Player Name
							</Label>
							<Input
								variant="form"
								type="text"
								name="playerName"
								placeholder="Enter your full name"
								{...register("playerName")}
							/>
							{errors.playerName && (
								<p className="text-red-600">{errors.playerName.message}</p>
							)}
						</div>
						<div className="space-y-3">
							<Label htmlFor="instagram" className="text-xl uppercase">
								Instagram
							</Label>
							<Input
								variant="form"
								type="text"
								name="instagram"
								placeholder="Enter your player's name"
								{...register("instagram")}
							/>
							{errors.instagram && (
								<p className="text-red-600">{errors.instagram.message}</p>
							)}
						</div>

						<div className="space-y-3">
							<Label htmlFor="phoneNumber" className="text-xl uppercase">
								Phone Number
							</Label>
							<Input
								variant="form"
								type="text"
								name="phoneNumber"
								placeholder="ex: 123-123-1234"
								{...register("phoneNumber")}
							/>
							{errors.phoneNumber && (
								<p className="text-red-600">{errors.phoneNumber.message}</p>
							)}
							<p className="text-sm text-neutral-300">
								*We will use your phone number if your instagram is not
								available for communication. We would like to keep in constant
								communication with you that way we are always on the same page.
							</p>
						</div>

						<div className="space-y-3">
							<label htmlFor="jerseySize" className="text-xl uppercase">
								What is your jersey size?{" "}
								<Link
									href={"/pdf/jersey-size-chart.pdf"}
									className="text-sm lowercase underline"
									target="_blank"
								>
									size guide
								</Link>
							</label>
							<select
								{...register("jerseySize", {
									required: "Jersey size is required",
								})}
								id="jerseySize"
								className="focus:ring-ring ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full items-center rounded-md border border-neutral-300 bg-[#111827] p-4 text-lg font-normal transition-colors file:border-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							>
								<option value="" disabled>
									Select your size
								</option>
								<option value="SM">SM</option>
								<option value="MD">MD</option>
								<option value="LG">LG</option>
								<option value="XL">XL</option>
								<option value="XXL">XXL</option>
								<option value="XXXL">XXXL</option>
								<option value="XXXXL">XXXXL</option>
							</select>
							{errors.jerseySize && (
								<p className="text-red-600">{errors.jerseySize.message}</p>
							)}
							<p className="text-sm text-neutral-300">
								Note: Your jersey size cannot be reordered.{" "}
								<a
									href="#"
									className="underline transition-all hover:text-neutral-100"
								>
									Read more here
								</a>
							</p>
						</div>

						<div className="space-y-3">
							<Label htmlFor="jerseyName" className="text-xl uppercase">
								What’s your custom jersey Name?
							</Label>
							<Input
								variant="form"
								type="text"
								name="jerseyName"
								placeholder="Enter custom jersey name"
								{...register("jerseyName")}
							/>
							{errors.jerseyName && (
								<p className="text-red-600">{errors.jerseyName.message}</p>
							)}
							<p className="text-sm text-neutral-300">
								Please ensure that spelling is correct. This cannot be changed
								later.
							</p>
						</div>
						<div className="space-y-3">
							<Label htmlFor="jerseyNumber" className="text-xl uppercase">
								What’s your Jersey Number?
							</Label>
							<Input
								variant="form"
								type="text"
								name="jerseyNumber"
								placeholder="Enter jersey number"
								{...register("jerseyNumber")}
							/>
							{errors.jerseyNumber && (
								<p className="text-red-600">{errors.jerseyNumber.message}</p>
							)}
							<p className="text-sm text-neutral-300">
								Please ensure this is the number that your want. This cannot be
								changed later.
							</p>
						</div>
					</div>

					<div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
						<h4 className="text-center text-xl uppercase">Team Summary</h4>
						<ul>
							<li className="text-lg">Team Name: {team.teamName}</li>
							{/* <li className="text-lg">
								Team Captain: {team.teamCaptain?.playerName}
							</li> */}
							<li className="text-lg">
								Division: {team.division?.divisionName}
							</li>
							<li className="text-lg">Location: {team.division?.location}</li>
							<li className="text-lg">
								Game Time:{" "}
								{team.division?.startTime === "00:00"
									? "TBD"
									: `${convertMilitaryToRegularTime(team.division?.startTime)} - ${convertMilitaryToRegularTime(team.division?.endTime)}`}
								<p className="text-sm text-neutral-200">
									Game times are subject to change
								</p>
							</li>
							<li className="text-lg">Game Day: {team.division?.day}</li>
						</ul>
					</div>

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
							<Link
								href={"/refund-policy"}
								target="_blank"
								className="underline"
							>
								Read Refund Policy
							</Link>
						</p>
					</div>

					<div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
						<h4 className="text-center text-xl uppercase">Payment</h4>
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
							<p className="text-red-600">
								{errors.agreeToRefundPolicy.message}
							</p>
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

						<div className="mt-5">
							<p className="text-xl uppercase">Total:</p>
							{team.paid === true ? (
								<p className="text-2xl font-semibold">Free</p>
							) : (
								<>
									{team.division?.earlyBirdOpen ? (
										<p className="text-2xl font-semibold">
											${team.division?.earlyBirdPrice} + tax
										</p>
									) : (
										<p>${team.division?.regularPrice} + tax</p>
									)}
								</>
							)}
						</div>
						{team.paid === true ? (
							<Button type="submit" className="mt-4 w-full">
								{isLoader ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									"Join for free"
								)}
							</Button>
						) : (
							<Button type="submit" className="mt-4 w-full">
								{isLoader ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									"Proceed to checkout"
								)}
							</Button>
						)}
					</div>

					<Button
						onClick={() =>
							setPlayerSelected({
								_id: "",
								playerName: "",
							})
						}
						className="mt-10 w-full"
						variant="secondary"
					>
						Back
					</Button>
				</form>
			)}
		</>
	);
};

export default JoinTeamSummary;
