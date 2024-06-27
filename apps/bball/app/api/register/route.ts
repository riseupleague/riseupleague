import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import User from "@/api-helpers/models/User";
import bcrypt from "bcryptjs";

/**
 * Handles the POST request to register a new user.
 *
 * @param {Request} req - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to the response object.
 */
export async function POST(req: Request) {
	try {
		await connectToDatabase();

		const { name, email, password } = await req.json();
		const hashedPassword = await bcrypt.hash(password, 10);
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			type: "email",
		});

		await newUser.save();

		return NextResponse.json(
			{ email: newUser.email, password: password },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error during user registration:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
