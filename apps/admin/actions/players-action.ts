"use server";

import Division from "@/api-helpers/models/Division";
import { revalidatePath } from "next/cache";
import Player from "@/api-helpers/models/Player";
import Team from "@/api-helpers/models/Team";
import Season from "@/api-helpers/models/Season";
import User from "@/api-helpers/models/User";
import { connectToDatabase } from "@/api-helpers/utils";

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
		const rawPlayerData = {
			playerName: playerData.get("name"),
			jerseyNumber: playerData.get("jerseyNumber"),
			jerseySize: playerData.get("jerseySize"),
			jerseyName: playerData.get("jerseyName"),
			instagram: playerData.get("instagram"),
			teamCaptain: playerData.get("teamCaptain") ? true : false,
		};

		// Update the player's profile in the database
		const updatedPlayer = await Player.findByIdAndUpdate(
			playerId,
			{
				$set: {
					playerName: rawPlayerData.playerName,
					jerseyNumber: rawPlayerData.jerseyNumber,
					jerseyName: rawPlayerData.jerseyName,
					instagram: rawPlayerData.instagram,
					jerseySize: rawPlayerData.jerseySize,
					teamCaptain: rawPlayerData.teamCaptain,
				},
			},
			{ new: true, runValidators: true }
		);
		if (!updatedPlayer)
			return { status: 500, message: "Internal server error." };

		revalidatePath("/");

		return { status: 200, message: "Successfully updated player." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal Server Error" };
	}
}

/**
 * Function to add a new player to the database with the provided player data.
 *
 * @param {FormData} playerData - The data of the player to be added.
 * @return {Object} An object containing the status and a message indicating the result of the operation.
 */
export async function addPlayer(playerData: FormData) {
	try {
		const averageStats = {
			points: 0,
			rebounds: 0,
			assists: 0,
			blocks: 0,
			steals: 0,
			threesMade: 0,
			twosMade: 0,
			freeThrowsMade: 0,
			threesMiss: 0,
			twosMiss: 0,
			freeThrowsMiss: 0,
			fouls: 0,
			turnovers: 0,
		};
		const rawPlayerData = {
			playerName: playerData.get("name"),
			jerseyNumber: playerData.get("jerseyNumber"),
			jerseySize: playerData.get("jerseySize"),
			jerseyName: playerData.get("jerseyName"),
			instagram: playerData.get("instagram"),
			team: playerData.get("team"),
			division: playerData.get("division"),
			season: playerData.get("season"),
			user: playerData.get("user"),
		};

		const team = await Team.findById(rawPlayerData.team);
		const division = await Division.findById(rawPlayerData.division);
		const season = await Season.findById(rawPlayerData.season);
		const user = await User.findById(rawPlayerData.user);

		if (!team) return { status: 404, message: "Team not found." };
		if (!division) return { status: 404, message: "Division not found." };
		if (!season) return { status: 404, message: "Season not found." };
		if (!user) return { status: 404, message: "User not found." };

		// Update the player's profile in the database
		const newPlayer = new Player({
			playerName: rawPlayerData.playerName,
			jerseyNumber: rawPlayerData.jerseyNumber,
			jerseySize: rawPlayerData.jerseySize,
			jerseyName: rawPlayerData.jerseyName,
			instagram: rawPlayerData.instagram,
			team: rawPlayerData.team,
			division: rawPlayerData.division,
			season: rawPlayerData.season,
			user: rawPlayerData.user,
			averageStats,
		});

		const savedPlayer = await newPlayer.save();
		team.players = team.players.concat(savedPlayer._id);
		await team.save();

		user.basketball = user.basketball.concat(savedPlayer._id);
		await user.save();

		if (!newPlayer) return { status: 500, message: "Internal server error." };

		revalidatePath("/");

		return { status: 200, message: "Successfully updated player." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal Server Error" };
	}
}

/**
 * Finds a user by their email and returns their details if found.
 *
 * @param {FormData} emailData - The form data containing the email of the user to be found.
 * @return {Promise<{status: number, message: string, userEmail?: string, userId?: string}>} - A promise that resolves to an object containing the status code, message, and optionally the user's email and ID if found.
 */
export async function findPlayerUser(emailData: FormData) {
	try {
		const email = emailData.get("email");

		const user = await User.findOne({ email });
		if (!user) {
			return { status: 404, message: "User does not exist." };
		}
		revalidatePath(`/`);
		return {
			status: 200,
			message: "Successfully found user.",
			userEmail: user.email.toString(),
			userId: user._id.toString(),
		};
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal Server Error" };
	}
}

export const deletePlayer = async (playerId: string) => {
	try {
		const player = await Player.findByIdAndDelete(playerId);
		if (!player) return { status: 404, message: "Player not found." };

		revalidatePath("/");

		return { status: 200, message: "Player deleted successfully." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal server error." };
	}
};
