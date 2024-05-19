// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/api-helpers/utils";
// import Worker from "@/api-helpers/models/Worker";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
// 	try {
// 		await connectToDatabase();

// 		// Extract user data from the request body
// 		const { name, email, password } = await req.json();
// 		// const hashedPassword = await bcrypt.hash(password, 10);
// 		// Check if the user already exists
// 		const existingUser = await Worker.findOne({ email });

// 		if (existingUser) {
// 			return NextResponse.json(
// 				{ error: "Worker already exists" },
// 				{ status: 400 }
// 			);
// 		}

// 		// Create a new user document
// 		const newWorker = new Worker({
// 			name,
// 			email,
// 			password,
// 			type: "owner",
// 		});
// 		console.log(newWorker);
// 		// Save the user to the database
// 		await newWorker.save();
// 		return NextResponse.json(
// 			{ email: newWorker.email, password: password },
// 			{ status: 201 }
// 		);
// 	} catch (error) {
// 		console.error("Error during worker registration:", error);
// 		return NextResponse.json(
// 			{ error: "Internal server error" },
// 			{ status: 500 }
// 		);
// 	}
// }

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import Worker from "@/api-helpers/models/Worker";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
	try {
		await connectToDatabase();

		// Extract user data from the request body
		const { name, email, password } = await req.json();

		// Check if the user already exists
		const existingUser = await Worker.findOne({ email });

		if (existingUser) {
			return NextResponse.json(
				{ error: "Worker already exists" },
				{ status: 400 }
			);
		}

		// Hash the password before saving it to the database
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user document with hashed password
		const newWorker = new Worker({
			name,
			email,
			password: hashedPassword, // Save hashed password
			type: "owner",
		});

		// Save the user to the database
		await newWorker.save();

		return NextResponse.json(
			{ email: newWorker.email }, // Don't send password back
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error during worker registration:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
