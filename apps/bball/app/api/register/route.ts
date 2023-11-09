import { NextResponse } from "next/server";

import { connectToDatabase } from "@/api-helpers/utils";
import User from "@/api-helpers/models/User";
import bcrypt from "bcryptjs";
export default async function handler(req: Request) {
	if (req.method === "POST") {
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
				{ error: "User registered successfully" },
				{ status: 201 }
			);
		} catch (error) {
			console.error("Error during user registration:", error);
			return NextResponse.json(
				{ error: "Internal server error" },
				{ status: 500 }
			);
		}
	} else {
		return NextResponse.json({ status: 405 }); // Method Not Allowed
	}
}

export const POST = handler;
