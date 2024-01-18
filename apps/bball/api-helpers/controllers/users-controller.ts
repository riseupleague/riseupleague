import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import Season from "@/api-helpers/models/Season";
import User from "@/api-helpers/models/User";
import { connectToDatabase } from "@/api-helpers/utils";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export const addNewUser = async (name: string, email: string, type: string) => {
	try {
		await connectToDatabase();

		const user = new User({
			name,
			email,
			type,
		});
		const savedUser = await user.save();

		revalidatePath("/", "layout");

		return NextResponse.json({ newUser: user }, { status: 201 });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
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

		revalidatePath("/", "layout");

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

		revalidatePath("/", "layout");

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
