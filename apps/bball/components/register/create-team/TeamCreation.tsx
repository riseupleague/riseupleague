"use client";

import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTeamSchema } from "@/schemas";
import Link from "next/link";
import { saveUnpaidTeam } from "@/actions/saveUnpaidTeam";

type TeamFormValues = z.infer<typeof createTeamSchema>;

const TeamCreation = ({ registerInfo, setRegisterInfo, user }) => {
	// const generateCode = () => {
	// 	const characters =
	// 		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	// 	let generatedCode = "";
	// 	for (let i = 0; i < 5; i++) {
	// 		const randomIndex = Math.floor(Math.random() * characters.length);
	// 		generatedCode += characters[randomIndex];
	// 	}

	// 	return generatedCode;
	// };

	// const defaultCode = generateCode();

	const defaultValues: TeamFormValues = {
		teamName: registerInfo?.teamDetails?.teamName || "",
		teamNameShort: registerInfo?.teamDetails?.teamNameShort || "",
		teamCode: registerInfo?.teamDetails?.teamCode || "",
		playerName: registerInfo?.teamCaptainDetails?.playerName || "",
		instagram: registerInfo?.teamCaptainDetails?.instagram || "",
		phoneNumber: registerInfo?.teamCaptainDetails?.phoneNumber || "",
		jerseySize: registerInfo?.teamCaptainDetails?.jerseySize || "",
		jerseyName: registerInfo?.teamCaptainDetails?.jerseyName || "",
		jerseyNumber: registerInfo?.teamCaptainDetails?.jerseyNumber || "",
	};

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TeamFormValues>({
		resolver: zodResolver(createTeamSchema),
		defaultValues,
	});

	const onSubmit: SubmitHandler<TeamFormValues> = async (data) => {
		const teamDetails = {
			teamName: data.teamName,
			teamNameShort: data.teamNameShort,
			teamCode: data.teamCode,
		};

		const teamCaptainDetails = {
			playerName: data.playerName,
			instagram: data.instagram,
			jerseySize: data.jerseySize,
			jerseyName: data.jerseyName,
			jerseyNumber: data.jerseyNumber,
			phoneNumber: data.phoneNumber,
		};

		setRegisterInfo({
			...registerInfo,
			teamDetails,
			teamCaptainDetails,
			step: 3,
			allowStep: {
				1: true,
				2: true,
				3: true,
				4: false,
				5: false,
			},
		});

		const unpaidTeamObject = {
			...registerInfo,
			teamDetails,
			teamCaptainDetails,
			step: 3,
			allowStep: {
				1: true,
				2: true,
				3: true,
				4: false,
				5: false,
			},
			paid: false,
		};

		await saveUnpaidTeam(user._id, unpaidTeamObject);

		const res = await fetch("/api/actions/add-phone-number", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userEmail: user.email,
				phoneNumber: data.phoneNumber,
			}),
		});
	};

	return (
		<section>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3 className="mb-6">Fill In Team Details</h3>

				<div className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] px-4 py-6 md:grid-cols-2">
					<div className="space-y-3">
						<Label htmlFor="teamName" className="text-xl uppercase">
							Team Name
						</Label>
						<Input
							variant="form"
							type="text"
							name="teamName"
							placeholder="Enter your team's name"
							{...register("teamName")}
						/>
						{errors.teamName && (
							<p className="text-red-600">{errors.teamName.message}</p>
						)}
					</div>
					<div className="space-y-3">
						<Label htmlFor="teamNameShort" className="text-xl uppercase">
							Short Team Name (Max 4 Letters)
						</Label>
						<Input
							variant="form"
							type="text"
							name="teamNameShort"
							placeholder="Enter your team's short name"
							{...register("teamNameShort")}
						/>
						{errors.teamNameShort && (
							<p className="text-red-600">{errors.teamNameShort.message}</p>
						)}
					</div>
					<div className="space-y-3">
						<Label htmlFor="teamCode" className="text-xl uppercase">
							Team Code
						</Label>
						<Input
							variant="form"
							type="text"
							name="teamCode"
							placeholder="Enter your team code"
							{...register("teamCode")}
						/>
						{errors.teamCode && (
							<p className="text-red-600">{errors.teamCode.message}</p>
						)}
						{/* <p className="text-sm text-neutral-300">
							This team code is generated randomly.
						</p> */}
					</div>
				</div>

				<h3 className="mb-6">Fill In Team Captain Details</h3>
				<div className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] p-6 md:grid-cols-2">
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
							Instagram Handle
						</Label>
						<Input
							variant="form"
							type="text"
							name="instagram"
							placeholder="Enter your IG handle"
							{...register("instagram")}
						/>
						{errors.instagram && (
							<p className="text-red-600">{errors.instagram.message}</p>
						)}
						<p className="text-sm text-neutral-300">
							Will be used to contact and tag you on photos, media and other
							related league events.
						</p>
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
							*We will use your phone number if your instagram is not available
							for communication. We would like to keep in constant communication
							with you that way we are always on the same page.
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

				<div className="mt-4 flex justify-between">
					<Button
						variant="secondary"
						onClick={() => setRegisterInfo({ ...registerInfo, step: 1 })}
					>
						Back
					</Button>
					<Button type="submit">Next</Button>
				</div>
			</form>
		</section>
	);
};

export default TeamCreation;
