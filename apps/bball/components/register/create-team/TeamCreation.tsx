"use client";

import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { useState } from "react";

const TeamCreation = ({ registerInfo, setRegisterInfo }) => {
	const [teamDetails, setTeamDetails] = useState({});
	const [teamCaptainDetails, setTeamCaptainDetails] = useState({});

	const handleTeamSubmit = () => {
		setRegisterInfo({
			...registerInfo,
			teamDetails,
			teamCaptainDetails,
			step: 3,
		});
	};

	return (
		<section>
			<h3 className="mb-6">Fill In Team Details</h3>

			<form className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] px-4 py-6 md:grid-cols-2">
				<div className="space-y-3">
					<Label htmlFor="teamName" className="text-xl uppercase">
						Team Name
					</Label>
					<Input
						variant="form"
						type="text"
						name="teamName"
						placeholder="Enter your team's name"
						onChange={(e) =>
							setTeamDetails({ ...teamDetails, teamName: e.target.value })
						}
					/>
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
						onChange={(e) =>
							setTeamDetails({ ...teamDetails, teamNameShort: e.target.value })
						}
					/>
				</div>
				<div className="space-y-3">
					<Label htmlFor="teamCode" className="text-xl uppercase">
						Team Code
					</Label>
					<Input
						variant="form"
						type="text"
						name="teamCode"
						placeholder=""
						onChange={(e) =>
							setTeamDetails({ ...teamDetails, teamCode: e.target.value })
						}
					/>
					<p className="text-sm text-neutral-300">
						This team code is generated randomly. You can create your own to
						share with your teammates to join.
					</p>
				</div>
			</form>

			<h3 className="mb-6">Fill In Team Captain Details</h3>
			<form className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] p-6 md:grid-cols-2">
				<div className="space-y-3">
					<Label htmlFor="playerName" className="text-xl uppercase">
						Player Name
					</Label>
					<Input
						variant="form"
						type="text"
						name="playerName"
						placeholder="Enter your full name"
						onChange={(e) =>
							setTeamCaptainDetails({
								...teamCaptainDetails,
								playerName: e.target.value,
							})
						}
					/>
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
						onChange={(e) =>
							setTeamCaptainDetails({
								...teamCaptainDetails,
								instagram: e.target.value,
							})
						}
					/>
					<p className="text-sm text-neutral-300">
						Will be used to contact and tag you on photos, media and other
						related league events.
					</p>
				</div>
				<div className="space-y-3">
					<Label htmlFor="jerseySize" className="text-xl uppercase">
						What is your jersey size?
					</Label>
					<Input
						variant="form"
						type="text"
						name="jerseySize"
						placeholder=""
						onChange={(e) =>
							setTeamCaptainDetails({
								...teamCaptainDetails,
								jerseySize: e.target.value,
							})
						}
					/>
					<p className="text-sm text-neutral-300">
						Note: Your jersey size cannot be reordered.{" "}
						<a
							href=""
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
						onChange={(e) =>
							setTeamCaptainDetails({
								...teamCaptainDetails,
								jerseyName: e.target.value,
							})
						}
					/>
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
						onChange={(e) =>
							setTeamCaptainDetails({
								...teamCaptainDetails,
								jerseyNumber: e.target.value,
							})
						}
					/>
					<p className="text-sm text-neutral-300">
						Please ensure this is the number that your want. This cannot be
						changed later.
					</p>
				</div>
			</form>

			<Button onClick={handleTeamSubmit} className="w-full">
				Continue
			</Button>
		</section>
	);
};

export default TeamCreation;
