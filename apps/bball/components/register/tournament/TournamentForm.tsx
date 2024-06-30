"use client";
import { useState } from "react";

import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTeamTournamentSchema } from "@/schemas";

import Link from "next/link";

type TeamFormValues = z.infer<typeof createTeamTournamentSchema>;

const TournamentForm = ({ registerInfo, setRegisterInfo }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<TeamFormValues>({
		resolver: zodResolver(createTeamTournamentSchema),
		defaultValues: {
			tournamentLevel: registerInfo?.teamDetails?.tournamentLevel || "",
			teamName: registerInfo?.teamDetails?.teamName || "",
			teamNameShort: registerInfo?.teamDetails?.teamNameShort || "",
			teamCaptainName: registerInfo?.teamCaptainDetails?.teamNameShort || "",
			instagram: registerInfo?.teamCaptainDetails?.teamNameShort || "",
			phoneNumber: registerInfo?.teamCaptainDetails?.teamNameShort || "",
			teamCaptainJerseyName:
				registerInfo?.teamCaptainDetails?.teamNameShort || "",
			teamCaptainJerseyNumber:
				registerInfo?.teamCaptainDetails?.teamNameShort || "",
			teamCaptainJerseySize:
				registerInfo?.teamCaptainDetails?.teamNameShort || "",
			roster: registerInfo?.roster,
		},
	});

	const { fields, append } = useFieldArray({
		control,
		name: "roster",
	});

	const onSubmit: SubmitHandler<TeamFormValues> = (data) => {
		console.log("data:", data);

		const teamDetails = {
			teamName: data.teamName,
			teamNameShort: data.teamNameShort,
			tournamentLevel: data.tournamentLevel,
		};

		const teamCaptainDetails = {
			playerName: data.teamCaptainName,

			instagram: data.instagram,
			jerseySize: data.teamCaptainJerseySize,
			jerseyName: data.teamCaptainJerseyName,
			jerseyNumber: data.teamCaptainJerseyNumber,
			phoneNumber: data.phoneNumber,
		};

		const roster = [...data.roster];

		setRegisterInfo({
			...registerInfo,
			teamDetails,
			teamCaptainDetails,
			roster,
			step: 3,
		});
		console.log(errors);
	};

	// const handlePlayerNameChange = (index, value) => {
	// 	const newPlayers = players.map((player, i) =>
	// 		i === index ? { ...player, name: value } : player
	// 	);
	// 	setPlayers(newPlayers);
	// };
	const addPlayer = () => {
		append({
			id: fields.length + 1,
			name: "",
			jerseySize: "",
			jerseyName: "",
			jerseyNumber: "",
		});
	};

	console.log(errors);

	return (
		<section>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3 className="mb-6">Skill Level</h3>

				<div className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] px-4 py-6 ">
					<div className="space-y-3">
						<label htmlFor="tournamentLevel" className="text-xl uppercase">
							What Skill level do you want to join in?{" "}
						</label>
						<select
							{...register("tournamentLevel", {
								required: "Jersey size is required",
							})}
							id="tournamentLevel"
							className="focus:ring-ring ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full items-center rounded-md border border-neutral-300 bg-[#111827] p-4 text-lg font-normal transition-colors file:border-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<option value="" disabled>
								Select skill level
							</option>

							{registerInfo?.division?.tournamentLevel.map((level) => (
								<option key={level._id} value={level._id}>
									{level.tournamentLevelName}
								</option>
							))}
						</select>
						{errors.tournamentLevel && (
							<p className="text-red-600">{errors.tournamentLevel.message}</p>
						)}
					</div>
				</div>

				<h3 className="mb-6">Team Details</h3>

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
				</div>

				<div className="mb-6">
					<h3>Team Captain Information</h3>
				</div>

				<div className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] px-4 py-6 md:grid-cols-2">
					<div className="space-y-3">
						<Label htmlFor="teamCaptainName" className="text-xl uppercase">
							Team Captain
						</Label>
						<Input
							variant="form"
							type="text"
							name="teamCaptainName"
							placeholder="Enter your full name"
							{...register("teamCaptainName")}
						/>
						{errors.teamCaptainName && (
							<p className="text-red-600">{errors.teamCaptainName.message}</p>
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
						<label
							htmlFor="teamCaptainJerseySize"
							className="text-xl uppercase"
						>
							Team Captain jersey size
							<Link
								href={"/pdf/jersey-size-chart.pdf"}
								className="text-sm lowercase underline"
								target="_blank"
							>
								size guide
							</Link>
						</label>
						<select
							{...register("teamCaptainJerseySize", {
								required: "Jersey size is required",
							})}
							id="teamCaptainJerseySize"
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
						{errors.teamCaptainJerseySize && (
							<p className="text-red-600">
								{errors.teamCaptainJerseySize.message}
							</p>
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
						<Label
							htmlFor="teamCaptainJerseyName"
							className="text-xl uppercase"
						>
							Team Captain custom jersey Name
						</Label>
						<Input
							variant="form"
							type="text"
							name="teamCaptainJerseyName"
							placeholder="Enter custom jersey name"
							{...register("teamCaptainJerseyName")}
						/>
						{errors.teamCaptainJerseyName && (
							<p className="text-red-600">
								{errors.teamCaptainJerseyName.message}
							</p>
						)}
						<p className="text-sm text-neutral-300">
							Please ensure that spelling is correct. This cannot be changed
							later.
						</p>
					</div>
					<div className="space-y-3">
						<Label
							htmlFor="teamCaptainJerseyNumber"
							className="text-xl uppercase"
						>
							Team Captain Jersey Number
						</Label>
						<Input
							variant="form"
							type="text"
							name="teamCaptainJerseyNumber"
							placeholder="Enter jersey number"
							{...register("teamCaptainJerseyNumber")}
						/>
						{errors.teamCaptainJerseyNumber && (
							<p className="text-red-600">
								{errors.teamCaptainJerseyNumber.message}
							</p>
						)}
						<p className="text-sm text-neutral-300">
							Please ensure this is the number that your want. This cannot be
							changed later.
						</p>
					</div>
				</div>

				<div className="mb-6">
					<h3>Build Your Roster</h3>
					<p className="text-lg uppercase">Team Name:</p>
					<p className="text-lg uppercase">
						<span className="text-primary">Reminder:</span> Jerseys are
						available only during early bird!
					</p>
				</div>

				<div className="my-8 rounded border border-neutral-600 bg-[#111827] px-4 py-6 ">
					<p className="mb-4  text-2xl uppercase">
						Please input your players so we can track their stats.
					</p>
					<div className="grid grid-cols-1 gap-3  md:grid-cols-2">
						{fields.map((player, index) => (
							<div key={player.id} className="space-y-3">
								<div className="space-y-3">
									<Label
										htmlFor={`roster[${index}].name`}
										className="text-xl uppercase"
									>
										Player {index + 1}
									</Label>
									<Input
										variant="form"
										type="text"
										placeholder={`Enter Player ${index + 1}'s name`}
										defaultValue={player.name}
										{...register(`roster.${index}.name`)}
									/>
									{errors.roster?.[index]?.name && (
										<p className="text-red-600">
											{errors.roster[index].name.message}
										</p>
									)}
								</div>
								<div className="space-y-3">
									<label
										htmlFor={`roster[${index}].jerseySize`}
										className="text-xl uppercase"
									>
										Player {index + 1} jersey size?{" "}
									</label>
									<select
										{...register(`roster.${index}.jerseySize`, {
											required: "Jersey size is required",
										})}
										id={`roster[${index}].jerseySize`}
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
									<Link
										href={"/pdf/jersey-size-chart.pdf"}
										className="text-sm lowercase underline"
										target="_blank"
									>
										size guide
									</Link>
									{errors.roster?.[index]?.jerseySize && (
										<p className="text-red-600">
											{errors.roster[index].jerseySize.message}
										</p>
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
									<Label
										htmlFor={`roster[${index}].jerseyName`}
										className="text-xl uppercase"
									>
										Player {index + 1} custom jersey Name?
									</Label>
									<Input
										variant="form"
										type="text"
										name={`roster[${index}].jerseyName`}
										placeholder="Enter custom jersey name"
										{...register(`roster.${index}.jerseyName`)}
									/>
									{errors.roster?.[index]?.jerseyName && (
										<p className="text-red-600">
											{errors.roster[index].jerseyName.message}
										</p>
									)}
									<p className="text-sm text-neutral-300">
										Please ensure that spelling is correct. This cannot be
										changed later.
									</p>
								</div>
								<div className="space-y-3">
									<Label
										htmlFor={`roster[${index}].jerseyNumber`}
										className="text-xl uppercase"
									>
										Player {index + 1} Jersey Number?
									</Label>
									<Input
										variant="form"
										type="text"
										name={`roster[${index}].jerseyNumber`}
										placeholder="Enter jersey number"
										{...register(`roster.${index}.jerseyNumber`)}
									/>
									{errors.roster?.[index]?.jerseyNumber && (
										<p className="text-red-600">
											{errors.roster[index].jerseyNumber.message}
										</p>
									)}
									<p className="text-sm text-neutral-300">
										Please ensure this is the number that your want. This cannot
										be changed later.
									</p>
								</div>
							</div>
						))}
					</div>
					<div className="mt-10">
						<Button
							type="button"
							className="w-full"
							variant="secondary"
							onClick={addPlayer}
						>
							Add Another Player
						</Button>
					</div>
					{errors.roster && (
						<p className="text-red-600">{errors.roster.message}</p>
					)}
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

export default TournamentForm;
