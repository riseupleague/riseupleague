import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import Player from "@/api-helpers/models/Player";
import Team from "@/api-helpers/models/Team";
import User from "@/api-helpers/models/User";
import Division from "@/api-helpers/models/Division";

export async function PATCH(req: Request) {
	try {
		await connectToDatabase();

		// Extract user data from the request body
		const { userId, name } = await req.json();

		// Check if there's an existing player to update
		const existingUser = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					name,
				},
			},
			{ new: true } // Return the updated player
		);

		return NextResponse.json({ user: existingUser }, { status: 201 });
	} catch (error) {
		console.error("Error during team update:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
