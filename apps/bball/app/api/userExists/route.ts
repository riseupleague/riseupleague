import { NextResponse } from "next/server";
import User from "@/api-helpers/models/User";
import { connectToDatabase } from "@/api-helpers/utils";

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
