import { NextResponse } from "next/server";
import User from "@/api-helpers/models/User";
import { connectToDatabase } from "@/api-helpers/utils";

/**
 * Handles the POST request to check if a user exists based on the provided email.
 *
 * @param {Request} req - The request object containing the email.
 * @return {Promise<NextResponse>} A promise that resolves to the response object with the user data if found, or a message indicating no user was found.
 * @throws {Error} If there is an error connecting to the database or retrieving the user.
 */
export async function POST(req: Request) {
	try {
		await connectToDatabase();

		const { email } = await req.json();
		const user = await User.findOne({ email, type: "email" });

		if (user) {
			return NextResponse.json({ user });
		} else {
			return NextResponse.json(
				{ message: "No divisions found" },
				{ status: 404 }
			);
		}
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
