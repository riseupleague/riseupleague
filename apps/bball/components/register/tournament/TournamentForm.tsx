"use client";
import { useState } from "react";

import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTeamTournamentSchema } from "@/schemas";

import Link from "next/link";

type TeamFormValues = z.infer<typeof createTeamTournamentSchema>;

const TournamentForm = ({ division, setDivision }) => {
	const [players, setPlayers] = useState([
		{ id: 1, name: "" },
		{ id: 2, name: "" },
		{ id: 3, name: "" },
		{ id: 4, name: "" },
	]);

	const defaultValues: TeamFormValues = {
		tournamentLevel: "",
		teamName: "",
		teamNameShort: "",
		teamCaptainName: "",
		instagram: "",
		phoneNumber: "",
		jerseySize: "",
		jerseyName: "",
		jerseyNumber: "",
	};

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TeamFormValues>({
		resolver: zodResolver(createTeamTournamentSchema),
		defaultValues,
	});

	const onSubmit: SubmitHandler<TeamFormValues> = (data) => {};

	const handlePlayerNameChange = (index, value) => {
		const newPlayers = players.map((player, i) =>
			i === index ? { ...player, name: value } : player
		);
		setPlayers(newPlayers);
	};
	const addPlayer = () => {
		setPlayers([...players, { id: players.length + 1, name: "" }]);
	};

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

							{division.tournamentLevel.map((level) => (
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
						{players.map((player, index) => (
							<div key={player.id} className="space-y-3">
								<div className="space-y-3">
									<Label
										htmlFor={`roster[${index}].name`}
										className="text-xl uppercase"
									>
										Player {player.id}
									</Label>
									<Input
										variant="form"
										type="text"
										placeholder={`Enter Player ${player.id}'s name`}
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
										Player {player.id} jersey size?{" "}
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
										Player {player.id} custom jersey Name?
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
										Player {player.id} Jersey Number?
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
				</div>

				<div className="mt-4 flex justify-between">
					<Button variant="secondary" onClick={() => setDivision({})}>
						Back
					</Button>
					<Button type="submit">Next</Button>
				</div>
			</form>
		</section>
	);
};

export default TournamentForm;
