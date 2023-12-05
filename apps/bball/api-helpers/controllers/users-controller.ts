import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import Season from "@/api-helpers/models/Season";

import User from "@/api-helpers/models/User";
import { connectToDatabase } from "@/api-helpers/utils";
import bcrypt from "bcryptjs";
export const addNewUser = async (name: string, email: string, type: string) => {
	try {
		await connectToDatabase();

		const user = new User({
			name,
			email,
			type,
		});
		const savedUser = await user.save();

		return NextResponse.json({ newUser: user }, { status: 201 });
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

		const user = await User.findOne({ email });
		// Your logic here
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
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getUserPlayerPayment = async (email: string) => {
	try {
		const season = await Season.findOne({ register: true });
		const user = await User.findOne({ email }).populate({
			path: "basketball",
			populate: [
				{
					path: "team",
					select: "teamName",
				},
				{
					path: "division",
					select: "divisionName", // Select the fields you want to include
				},
			],
		});

		return NextResponse.json({
			players: user.basketball,
			season: season._id.toString(),
		});
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getCurrentUser = async (email: string) => {
	try {
		const season = await Season.findOne({ register: true });
		const user = await User.findOne({ email }).populate({
			path: "basketball",
			populate: [
				{
					path: "team",
					select:
						"teamName teamCode primaryColor secondaryColor tertiaryColor jerseyEdition players",
					populate: {
						path: "players",
						model: "Player",
					},
				},
				{
					path: "division",
					select: "divisionName location day description startTime endTime",
				},
				{
					path: "season",
					select: "seasonName",
				},
			],
			select:
				"team division season playerName  instagram jerseyNumber jerseySize shortSize jerseyName",
		});

		return NextResponse.json({
			user,
		});
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
