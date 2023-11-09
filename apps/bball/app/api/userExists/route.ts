import { NextResponse } from "next/server";

import User from "@/api-helpers/models/User";
import { connectToDatabase } from "@/api-helpers/utils";
export default async function handler(req: Request) {
	if (req.method === "POST") {
		try {
			await connectToDatabase();
			const { email } = await req.json();
			console.log(req.body);
			console.log("email:", email);
			const user = await User.findOne({ email, type: "email" });
			// Your logic here
			console.log("User:", user);
			if (user) {
				console.log("user exists");
				return NextResponse.json({ user });
			} else {
				console.log("create account");
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
	} else {
		return NextResponse.json({ status: 405 }); // Method Not Allowed
	}
}

export const POST = handler;
