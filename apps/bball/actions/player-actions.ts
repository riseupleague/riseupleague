"use server";

import Player from "@/api-helpers/models/Player";
import { revalidatePath } from "next/cache";
import { updatePlayerSchema } from "@/validation/player-validations";

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
			playerName: playerData.get("playerName"),
			instagram: playerData.get("instagram"),
			jerseyName: playerData.get("jerseyName"),
			jerseyNumber: playerData.get("jerseyNumber"),
			jerseySize: playerData.get("jerseySize"),
			shortSize: playerData.get("shortSize"),
		};

		const validatedFields = updatePlayerSchema.safeParse(rawPlayerData);

		if (validatedFields.success === false) {
			const errors = validatedFields.error.flatten().fieldErrors;

			return {
				status: 422,
				message: "Invalid data.",
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
