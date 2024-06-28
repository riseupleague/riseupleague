import { NextResponse } from "next/server";
import Season from "@/api-helpers/models/Season";
import User from "@/api-helpers/models/User";
import { connectToDatabase } from "@/api-helpers/utils";

/**
 * Adds a new user to the database.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} type - The type of the user.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object with the new user data or an error message.
 */
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

/**
 * Retrieves the user's player payment information based on the provided email.
 *
 * @param {string} email - The email of the user
 * @return {Promise} A promise that resolves with the user's player payment information
 */
export const getUserPlayerPayment = async (email: string) => {
	try {
		const season = await Season.findOne({ register: true });
		const user = await User.findOne({ email }).populate({
			path: "basketball",
			populate: [
				{
					path: "team",
					populate: [
						{
							path: "division", // Populate the division field within team
							select: "divisionName startTime endTime location", // Select the fields you want to include
						},
						{
							path: "teamCaptain",
							select: "playerName",
						},
					],

					select: "teamName teamCode division createdAt paid teamCaptain", // Include division for the team
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

/**
 * Retrieves current season, register season, and user information based on the provided email.
 *
 * @param {string} email - The email of the user
 * @return {Promise<object>} A Promise that resolves to an object containing user, season, and registerSeason information
 */
export const getCurrentAndRegisterUserPlayers = async (email: string) => {
	try {
		const season = await Season.findOne({ active: true });
		const registerSeason = await Season.findOne({ register: true });

		const user = await User.findOne({ email }).populate({
			path: "basketball",
			populate: [
				{
					path: "team",
					select:
						"teamName teamCode primaryColor secondaryColor tertiaryColor jerseyEdition players paid",
					populate: [
						{
							path: "players",
							model: "Player",
						},
						{
							path: "games",
							model: "Game",
						},
					],
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
				"team division season playerName  instagram jerseyNumber jerseySize jerseyName freeAgent",
		});

		return NextResponse.json({ user, season, registerSeason });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves the current user based on their email.
 *
 * @param {string} email - The email of the user.
 * @return {Promise<NextResponse>} A promise that resolves to the user object.
 */
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
				"team division season playerName  instagram jerseyNumber jerseySize jerseyName",
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
