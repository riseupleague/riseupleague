"use client";

import FeaturedPlayerCard from "../general/FeaturedPlayerCard";
import { useState } from "react";
import { addPlayerToExistingTeam } from "@/actions/player-actions";
import { useToast } from "@ui/components/use-toast";
import { useRouter } from "next/navigation";
import AddPlayerToTeam from "./roster/AddPlayerToTeam";
import DeletePlayerFromTeam from "./roster/DeletePlayerFromTeam";

const UserPlayerRoster = ({ team, selectedPlayer }) => {
	const router = useRouter();
	const { toast } = useToast();
	const [errors, setErrors] = useState(undefined);
	const [addOpen, setAddOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const teamCaptain = team.filter((player) => player.teamCaptain === true)[0];
	const teamId = team[0].team;
	const isTeamCaptain = teamCaptain?._id === selectedPlayer._id ? true : false;
	const teamPaidInFull = selectedPlayer?.team?.paid;
	const maxNumPlayers = teamPaidInFull ? team.length >= 10 : team.length >= 16;

	const handleAddPlayer = async (playerData: FormData) => {
		const result = await addPlayerToExistingTeam(
			playerData,
			teamId,
			selectedPlayer
		);

		if (result?.errors) return setErrors(result.errors);

		// successfully created player
		if (result?.status === 200) {
			setErrors(undefined);

			setAddOpen(false);

			toast({
				variant: "success",
				title: "Player added to team!",
				description: result.message,
			});

			return router.push("/user");
		}

		// show error toast
		setErrors(result.errors);
		return toast({
			variant: "destructive",
			title: "Error",
			description: result.message,
		});
	};

	return (
		<>
			<div className="flex justify-between">
				<p className="font-barlow mb-10 text-3xl uppercase">My Roster</p>
				{isTeamCaptain && (
					<div className="flex gap-2">
						<AddPlayerToTeam
							open={addOpen}
							setOpen={setAddOpen}
							handleAddPlayer={handleAddPlayer}
							maxNumPlayers={maxNumPlayers}
							errors={errors}
						/>
						<DeletePlayerFromTeam
							open={deleteOpen}
							setOpen={setDeleteOpen}
							team={team}
						/>
					</div>
				)}
			</div>

			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{team
					?.sort((a, b) => (a.jerseyNumber > b.jerseyNumber ? 1 : -1))
					.map((player, index) => (
						<FeaturedPlayerCard player={player} key={index} />
					))}
			</div>
		</>
	);
};

export default UserPlayerRoster;
