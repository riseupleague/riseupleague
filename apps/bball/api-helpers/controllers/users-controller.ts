import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

import User from "@/api-helpers/models/User";
import { connectToDatabase } from "@/api-helpers/utils";
import bcrypt from "bcryptjs";
export const addNewUser = async (name: string, email: string, type: string) => {
	try {
		await connectToDatabase();

		const newUser = await User.create({ name, email, type });

		return NextResponse.json({ message: "User registered" }, { status: 201 });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

const addNewUserWithPassword = async (
	name: string,
	email: string,
	password: string
) => {
	await connectToDatabase();

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = await User.create({ name, email, password: hashedPassword });
	return NextResponse.json({ message: "User registered" }, { status: 201 });
};

export const handleAddNewUserWithPassword = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		await connectToDatabase();
		const { email } = req.body;

		console.log("email:", email);
		const user = await User.findOne({ email });
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
		res.status(500).json({ error: "Internal server error" });
	}
};
