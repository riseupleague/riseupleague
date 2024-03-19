"use server";

import Division from "@/api-helpers/models/Division";
import { revalidatePath } from "next/cache";
import Player from "@/api-helpers/models/Player";

/**
 * Create a new team for a given season and division.
 *
 * @param {string} seasonId - The ID of the season for the new team.
 * @param {string} divisionId - The ID of the division for the new team.
 * @param {FormData} playerData - The data for the new team.
 * @return {Promise<Object>} An object with a status and a message.
 */

export async function updatePlayer(playerId: string, playerData: FormData) {
	try {
		// Update the player's profile in the database
		const updatedPlayer = await Player.findByIdAndUpdate(
			playerId,
			{
				$set: {
					playerName: playerData.playerName,
					jerseyNumber: playerData.jerseyNumber,
					jerseyName: playerData.jerseyName,
					instagram: playerData.instagram,
				},
			},
			{ new: true, runValidators: true }
		);
		if (!updatedPlayer) {
			return { status: 500, message: "Internal server error." };
		}
		revalidatePath(`/`);
		return { status: 200, message: "Successfully updated player." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal Server Error" };
	}
}

export async function deletePlayer(teamId: string) {
	try {
		const team = await Team.findById(teamId);
		if (!team) return { status: 404, message: "No team found." };

		await Team.findByIdAndRemove(teamId);

		return { status: 200, message: "Successfully deleted team." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal server error." };
	}
}
