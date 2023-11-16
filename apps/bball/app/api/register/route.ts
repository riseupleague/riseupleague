import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import User from "@/api-helpers/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
	try {
		await connectToDatabase();

		// Extract user data from the request body
		const { name, email, password } = await req.json();
		const hashedPassword = await bcrypt.hash(password, 10);
		// Check if the user already exists
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}

		// Create a new user document
		const newUser = new User({
			name,
			email,
			password: hashedPassword, // You should hash the password before storing it
			type: "email",
		});

		// Save the user to the database
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
