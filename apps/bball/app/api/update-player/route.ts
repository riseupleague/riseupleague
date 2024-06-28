import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import Player from "@/api-helpers/models/Player";

/**
 * Updates an existing player's information based on the provided request.
 *
 * @param {Request} req - The request object containing the player information.
 * @return {Promise<NextResponse>} A promise that resolves to the response object with the updated player data and status codes based on the outcome.
 */
export async function PATCH(req: Request) {
	try {
		await connectToDatabase();

		// Extract user data from the request body
		const {
			playerId,
			playerName,
			jerseyName,
			jerseyNumber,
			jerseySize,
			shortSize,
			instagram,
		} = await req.json();

		// Check if there's an existing player to update
		const existingPlayer = await Player.findByIdAndUpdate(
			playerId,
			{
				$set: {
					playerName,
					jerseyName,
					jerseyNumber,
					jerseySize,
					shortSize,
					instagram,
				},
			},
			{ new: true }
		);

		return NextResponse.json({ newPlayer: existingPlayer }, { status: 201 });
	} catch (error) {
		console.error("Error during team update:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
