import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import User from "@/api-helpers/models/User";

/**
 * Updates an existing user's information based on the provided request.
 *
 * @param {Request} req - The request object containing the user information.
 * @return {Promise<NextResponse>} A promise that resolves to the response object with the updated user data and status codes based on the outcome.
 */
export async function PATCH(req: Request) {
	try {
		await connectToDatabase();

		// Extract user data from the request body
		const { userEmail, phoneNumber } = await req.json();

		// Check if there's an existing player to update
		const existingUser = await User.findOne({ email: userEmail });

		existingUser.phoneNumber = phoneNumber;
		existingUser.save();

		return NextResponse.json({ user: existingUser }, { status: 201 });
	} catch (error) {
		console.error("Error during team update:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
