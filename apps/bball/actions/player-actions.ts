"use server";

import Player from "@/api-helpers/models/Player";
import { revalidatePath } from "next/cache";
import {
	updatePlayerSchema,
	addPlayerSchema,
} from "@/validation/player-validations";
import Team from "@/api-helpers/models/Team";

/**
 * Update player information in the database.
 *
 * @param {string} playerId - The ID of the player to update.
 * @param {FormData} playerData - The new data for the player.
 * @return {Object} Object containing status and message indicating the result of the update.
 */
export const updatePlayer = async (playerId: string, playerData: FormData) => {
	try {
		const rawPlayerData = {
			playerName: playerData.get("playerName") as string,
			instagram: playerData.get("instagram") as string,
			jerseyName: playerData.get("jerseyName") as string,
			jerseyNumber: playerData.get("jerseyNumber") as string,
			jerseySize: playerData.get("jerseySize") as string,
			shortSize: playerData.get("shortSize") as string,
		};

		const validatedFields = updatePlayerSchema.safeParse(rawPlayerData);

		if (validatedFields.success === false) {
			const errors = validatedFields.error.flatten().fieldErrors;

			return {
				status: 422,
				message: "Invalid fields provided. Please see errors below.",
				errors: errors,
			};
		}

		const playerExists = await Player.findById(playerId);
		if (!playerExists) return { status: 404, message: "Player not found." };

		const player = await Player.findByIdAndUpdate(playerId, rawPlayerData);
		if (!player) return { status: 500, message: "Internal server error." };

		revalidatePath("/");

		return {
			status: 200,
			message: "Player updated successfully.",
		};
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal server error." };
	}
};

/**
 * Adds a player to an existing team.
 *
 * @param {FormData} playerData - The data of the player to be added.
 * @param {string} teamId - The ID of the team to which the player will be added.
 * @return {Promise<{ status: number, message: string, errors?: object }>} - A promise that resolves to an object with the status code, message, and optional errors.
 */
export const addPlayerToExistingTeam = async (
	playerData: FormData,
	teamId: string,
	user: any
) => {
	const rawPlayerData = {
		playerName: playerData.get("playerName") as string,
		teamId: teamId,
	};

	const validatedFields = addPlayerSchema.safeParse(rawPlayerData);

	if (validatedFields.success === false) {
		const errors = validatedFields.error.flatten().fieldErrors;

		return {
			status: 422,
			errors: errors,
		};
	}

	try {
		const teamExists = await Team.findById(teamId);
		if (!teamExists) return { status: 404, message: "Team not found." };

		const newPlayer = new Player({
			season: user?.season?._id.toString(),
			division: user?.division?._id.toString(),
			team: teamId,
			teamCaptain: false,
			playerName: rawPlayerData.playerName,
			averageStats: {
				points: 0,
				rebounds: 0,
				assists: 0,
				blocks: 0,
				steals: 0,
				threesMade: 0,
				twosMade: 0,
				freeThrowsMade: 0,
			},
		});

		await newPlayer.save();

		return {
			status: 200,
			message: "Player added successfully.",
		};
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal server error." };
	}
};

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
