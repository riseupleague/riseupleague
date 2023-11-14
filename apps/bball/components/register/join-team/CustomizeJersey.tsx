"use client";
import { useState } from "react";
import { Separator } from "@ui/components/separator";
import { Button } from "@ui/components/button";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/table";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/components/select";

import Link from "next/link";
import getStripe from "@/utils/checkout";

interface FormData {
	teamName: string;
	teamNameShort?: string;
	teamCode?: string;
	jerseyName: string;
	jerseyNumber: string;
	instagram: string;
	jerseySize: string;
	shortSize: string;
	termsChecked: boolean;
	refundChecked: boolean;
}
interface FormErrors {
	teamName?: string;
	teamNameShort?: string;
	teamCode?: string;
	jerseyName?: string;
	jerseyNumber?: string;
	jerseySize?: string;
	shortSize?: string;
	termsChecked?: string;
	refundChecked?: string;
}

export default function CustomizeJersey({
	team,
	session,
	player,
	division,
	teamId,
}) {
	const [isSummary, setIsSummary] = useState(false);

	const [formData, setFormData] = useState<FormData>({
		teamName: team.teamName,
		teamNameShort: team.teamNameShort,
		teamCode: team.teamCode,
		jerseyName: player ? player?.jerseyName : "",
		instagram: player ? player?.instagram : "",
		jerseyNumber: player ? player?.jerseyNumber : "",
		jerseySize: player ? player?.jerseySize : "",
		shortSize: player ? player?.shortSize : "",
		termsChecked: false,
		refundChecked: false,
	});
	const [formErrors, setFormErrors] = useState<FormErrors>({});

	const validateForm = (): FormErrors => {
		const errors: FormErrors = {};

		if (!formData.teamName) {
			errors.teamName = "Team name is required";
		}

		if (!formData.teamCode) {
			errors.teamCode = "Team code is required";
		}

		if (!formData.jerseyName) {
			errors.jerseyName = "Name on the back of the jersey is required";
		}

		if (!formData.jerseyNumber) {
			errors.jerseyNumber = "Jersey number is required";
		}

		if (!formData.jerseySize) {
			errors.jerseySize = "Jersey top size is required";
		}

		if (!formData.shortSize) {
			errors.shortSize = "Jersey bottom size is required";
		}

		if (!formData.termsChecked) {
			errors.termsChecked = "You must agree to the terms and conditions";
		}

		if (!formData.refundChecked) {
			errors.refundChecked = "You must agree to the refund policy";
		}

		return errors;
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const errors = validateForm();

		console.log(errors);
		if (Object.keys(errors).length === 0) {
			setIsSummary(true);
			window.scrollTo({
				top: 0,
				behavior: "smooth", // This enables smooth scrolling
			});
		} else {
			setFormErrors(errors);
		}
	};

	const handleJerseySize = (value: string) => {
		setFormData({ ...formData, jerseySize: value });
	};

	const handleShortSize = (value: string) => {
		setFormData({ ...formData, shortSize: value });
	};

	const handleCreateTeamAndPlayer = async (
		itemPriceId: string,
		payment: string
	) => {
		const { jerseyName, jerseyNumber, jerseySize, shortSize, instagram } =
			formData;

		// Check for required input fields
		if (!jerseyNumber || !jerseySize || !shortSize) {
			console.error("Invalid Inputs");
			return; // Exit the function if inputs are invalid
		}

		try {
			const playerObject = {
				jerseyNumber,
				jerseySize,
				shortSize,
				jerseyName,
				instagram,
				team: team._id,
				division: team.division,
				season: team.season,
				playerName: session.user.name,
				email: session.user.email,
				playerId: player ? player._id : "",
				teamId: player ? player.team._id : "",
				status: "joinTeam",
			};

			let resPlayer;
			console.log("player:", player);

			if (player) {
				resPlayer = await fetch("/api/register-player", {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(playerObject),
				});
			} else {
				resPlayer = await fetch("/api/register-player", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(playerObject),
				});
			}

			const newPlayer = await resPlayer.json();
			console.log("Player created:", newPlayer);

			const formObject = {
				status: "joinTeam",
				playerId: newPlayer.player._id,
				division: division._id,
				season: division.season,
				itemPriceId: itemPriceId,
				payment: payment,
			};

			redirectToCheckout([{ price: itemPriceId, quantity: 1 }], formObject);
		} catch (error) {
			console.error("Error creating team:", error);
		}
	};

	const redirectToCheckout = async (items, formObject) => {
		try {
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
				await stripe.redirectToCheckout({ sessionId: session.id });
			} else {
				console.error("Failed to create Stripe checkout session:", response);
			}
		} catch (error) {
			console.error("Error creating Stripe checkout session:", error);
		}
	};
	return (
		<>
			{!isSummary ? (
				<>
					<Link
						href={"/register/join-team"}
						className="my-2 flex items-center gap-3 text-xl text-neutral-300"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15"
							height="20"
							viewBox="0 0 15 20"
							fill="none"
						>
							<path
								d="M8.125 16.25L1.875 10L8.125 3.75"
								stroke="#ABAFB3"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Back
					</Link>
					<h3 className="mt-20  text-3xl uppercase">Customize your jersey:</h3>

					<form onSubmit={handleFormSubmit}>
						<div className="mt-5 flex flex-col gap-5 rounded-md bg-neutral-700 px-3 py-6">
							<h4 className="text-lg uppercase underline">Your Own Jersey:</h4>
							{/* for early birds only */}
							<section>
								<Label className="uppercase">
									Name on the back of the Jersey
								</Label>
								<Input
									type="text"
									className="border-neutral-500 bg-neutral-700 py-[16px]"
									value={formData.jerseyName}
									onChange={(e) =>
										setFormData({ ...formData, jerseyName: e.target.value })
									}
								/>
							</section>
							<section>
								<Label className="uppercase">Jersey Number</Label>
								<Input
									type="text"
									className="border-neutral-500 bg-neutral-700 py-[16px]"
									value={formData.jerseyNumber}
									onChange={(e) => {
										const input = e.target.value;

										if (input === "" || input.match(/^\d*$/)) {
											setFormErrors({
												...formErrors,
												jerseyNumber: undefined, // Clear the error
											});
											setFormData({ ...formData, jerseyNumber: input });
										} else {
											setFormErrors({
												...formErrors,
												jerseyNumber: "Jersey number must be a valid number",
											});
										}
									}}
								/>
								{formErrors.jerseyNumber &&
									formErrors.jerseyNumber ===
										"Jersey number must be a valid number" && (
										<p className="text-primary">{formErrors.jerseyNumber}</p>
									)}
							</section>

							<section>
								<Label className="uppercase">Jersey Top Size</Label>
								<Select onValueChange={handleJerseySize}>
									<SelectTrigger className="font-barlow w-full text-lg md:w-[180px]">
										<SelectValue placeholder={formData.jerseySize} />
									</SelectTrigger>
									<SelectContent className="font-barlow text-lg">
										<SelectGroup>
											<SelectItem value="SM">SM</SelectItem>
											<SelectItem value="MD">MD</SelectItem>
											<SelectItem value="LG">LG</SelectItem>
											<SelectItem value="XL">XL</SelectItem>
											<SelectItem value="XXL">XXL</SelectItem>
											<SelectItem value="XXXL">XXXL</SelectItem>
											<SelectItem value="XXXXL">XXXXL</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</section>
							<section>
								<Label className="uppercase">Jersey Bottom Size</Label>
								<Select onValueChange={handleShortSize}>
									<SelectTrigger className="font-barlow w-full text-lg md:w-[180px]">
										<SelectValue placeholder={formData.shortSize} />
									</SelectTrigger>
									<SelectContent className="font-barlow text-lg">
										<SelectGroup>
											<SelectItem value="SM">SM</SelectItem>
											<SelectItem value="MD">MD</SelectItem>
											<SelectItem value="LG">LG</SelectItem>
											<SelectItem value="XL">XL</SelectItem>
											<SelectItem value="XXL">XXL</SelectItem>
											<SelectItem value="XXXL">XXXL</SelectItem>
											<SelectItem value="XXXXL">XXXXL</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</section>

							<Separator
								orientation="horizontal"
								className="my-5 bg-neutral-600"
							/>

							<h4 className="text-lg uppercase underline">Personal:</h4>
							{/* for early birds only */}
							<section>
								<Label className="uppercase">Instagram</Label>
								<Input
									type="text"
									className="border-neutral-500 bg-neutral-700 
											py-[16px]"
									value={formData.instagram}
									onChange={(e) =>
										setFormData({ ...formData, instagram: e.target.value })
									}
								/>
								<p className="mt-1 text-xs text-neutral-100">
									Instagram is not required. It will be used for media purposes,
									highlights, shoutouts, etc.
								</p>
							</section>
							<section className="mt-10 flex flex-col gap-3">
								<div className="flex items-center">
									<Checkbox
										id="checkBoxTerms"
										className="!mr-4 border-white"
										checked={formData.termsChecked}
										onCheckedChange={() =>
											setFormData({
												...formData,
												termsChecked: !formData.termsChecked,
											})
										}
									/>
									<Label
										htmlFor="checkBoxTerms"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										I have read and agree to the{" "}
										<Link className="underline" href="/terms">
											Terms and Conditions
										</Link>
										.
									</Label>
								</div>
								<div className="flex items-center">
									<Checkbox
										id="checkBoxRefund"
										className="!mr-4 border-white"
										checked={formData.refundChecked}
										onCheckedChange={() =>
											setFormData({
												...formData,
												refundChecked: !formData.refundChecked,
											})
										}
									/>
									<Label
										htmlFor="checkBoxRefund"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										I have read and agree to the{" "}
										<Link className="underline" href="/terms">
											Refund Policy
										</Link>
										.
									</Label>
								</div>
							</section>
						</div>
						{/* Error messages */}
						{formErrors.teamName && (
							<p className="text-primary  rounded-md p-2">
								{formErrors.teamName}
							</p>
						)}
						{formErrors.jerseyName && (
							<p className="text-primary  rounded-md p-2">
								{formErrors.jerseyName}
							</p>
						)}
						{formErrors.jerseyNumber && (
							<p className="text-primary  rounded-md p-2">
								{formErrors.jerseyNumber}
							</p>
						)}
						{formErrors.jerseySize && (
							<p className="text-primary  rounded-md p-2">
								{formErrors.jerseySize}
							</p>
						)}
						{formErrors.shortSize && (
							<p className="text-primary  rounded-md p-2">
								{formErrors.shortSize}
							</p>
						)}
						{formErrors.termsChecked && (
							<p className="text-primary  rounded-md p-2">
								{formErrors.termsChecked}
							</p>
						)}
						{formErrors.refundChecked && (
							<p className="text-primary  rounded-md p-2">
								{formErrors.refundChecked}
							</p>
						)}

						<div className="mt-10 flex justify-end">
							<Button type="submit">Continue</Button>
						</div>
					</form>
				</>
			) : (
				<>
					<button
						onClick={() => setIsSummary(false)}
						className="my-2 flex items-center gap-3 text-xl text-neutral-300"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15"
							height="20"
							viewBox="0 0 15 20"
							fill="none"
						>
							<path
								d="M8.125 16.25L1.875 10L8.125 3.75"
								stroke="#ABAFB3"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Back
					</button>
					<h3 className="mt-20  text-3xl uppercase">Summary:</h3>
					<div>
						<div className="mt-5 flex flex-col gap-5 rounded-md bg-neutral-700 px-3 py-6">
							<h4 className="text-lg uppercase underline">Team Identity:</h4>

							<section className="flex items-center">
								<Label className="uppercase">Team Name:</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.teamName}
									disabled
								/>
							</section>
							<section className="flex items-center">
								<Label className="uppercase">Abbreviation:</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.teamNameShort}
									disabled
								/>
							</section>

							<Separator
								orientation="horizontal"
								className="my-5 bg-neutral-600"
							/>

							<h4 className="text-lg uppercase underline">Your Own Jersey:</h4>
							{/* for early birds only */}
							<section className="flex items-center">
								<Label className="uppercase">
									Name on the back of the Jersey
								</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.jerseyName}
									disabled
								/>
							</section>
							<section className="flex items-center">
								<Label className="uppercase">Jersey Number</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.jerseyNumber}
									disabled
								/>
							</section>

							<section className="flex items-center">
								<Label className="uppercase">Jersey Top Size</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.jerseySize}
									disabled
								/>
							</section>
							<section className="flex items-center">
								<Label className="uppercase">Jersey Bottom Size</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.shortSize}
									disabled
								/>
							</section>
							<h4 className="text-lg uppercase underline">Personal:</h4>
							{/* for early birds only */}
							<section>
								<Label className="uppercase">Instagram</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.instagram}
									disabled
								/>
							</section>

							<section className="flex flex-col gap-3">
								<div className="flex items-center">
									<Checkbox
										id="checkBoxTerms"
										className="!mr-4 border-white"
										checked={formData.termsChecked}
									/>
									<Label
										htmlFor="checkBoxTerms"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										I have read and agree to the{" "}
										<Link className="underline" href="/terms">
											Terms and Conditions
										</Link>
										.
									</Label>
								</div>
								<div className="flex items-center">
									<Checkbox
										id="checkBoxRefund"
										className="!mr-4 border-white"
										checked={formData.refundChecked}
									/>
									<Label
										htmlFor="checkBoxRefund"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										I have read and agree to the{" "}
										<Link className="underline" href="/terms">
											Refund Policy
										</Link>
										.
									</Label>
								</div>
							</section>
						</div>

						<div className="mt-20 flex flex-col gap-10">
							<h4 className="text-3xl uppercase">Overall total:</h4>
							<p className="text-4xl">
								$
								{division.earlyBirdOpen
									? division.earlyBirdPrice
									: division.regularPrice}{" "}
								<span className="text-sm text-neutral-50">+ 13% HST</span>
							</p>
							<Button
								className="uppercase"
								onClick={() => {
									division.earlyBirdOpen
										? handleCreateTeamAndPlayer(division.earlyBirdId, "full")
										: handleCreateTeamAndPlayer(
												division.regularPriceFullId,
												"full"
										  );
								}}
							>
								Pay in full
							</Button>

							{!division.earlyBirdOpen && (
								<>
									<Separator
										orientation="horizontal"
										className="bg-neutral-600"
									/>{" "}
									<p className="text-4xl">
										$67.80{" "}
										<span className="text-sm text-neutral-50">
											Today + 3 more $67.80 bi-weekly
										</span>
									</p>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead className="uppercase">Payment</TableHead>
												<TableHead className="uppercase">Due dates</TableHead>
												<TableHead className="uppercase">Amount</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											<TableRow className="uppercase">
												<TableCell>1st</TableCell>
												<TableCell>sep 4, 2023</TableCell>
												<TableCell>$67.80</TableCell>
											</TableRow>
											<TableRow className="uppercase">
												<TableCell>2nd</TableCell>
												<TableCell>sep 4, 2023</TableCell>
												<TableCell>$67.80</TableCell>
											</TableRow>
											<TableRow className="uppercase">
												<TableCell>3rd</TableCell>
												<TableCell>sep 4, 2023</TableCell>
												<TableCell>$67.80</TableCell>
											</TableRow>
											<TableRow className="uppercase">
												<TableCell>4th</TableCell>
												<TableCell>sep 4, 2023</TableCell>
												<TableCell>$67.80</TableCell>
											</TableRow>
										</TableBody>
									</Table>
									<Button
										onClick={() =>
											handleCreateTeamAndPlayer(
												division.regularPriceInstalmentId,
												"four"
											)
										}
										variant="secondary"
										className="uppercase text-neutral-300"
									>
										Pay in instalments
									</Button>
									<ul className="flex flex-col gap-4 text-sm uppercase text-neutral-300">
										<li>
											Your card will be saved on file and automatically charged
											on the scheduled dates ABOVE.
										</li>
										<li>
											Scheduled online payments will be subject to an additional
											Online Payment Fee.
										</li>
										<li>
											late payments will be subject to additional fees or may
											receive penalties.
										</li>
									</ul>
								</>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
}