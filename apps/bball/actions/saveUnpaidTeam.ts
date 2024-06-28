"use server";

import User from "@/api-helpers/models/User";
import { connectToDatabase } from "@/api-helpers/utils";

/**
 * Saves an unpaid team for a user.
 *
 * @param {string} userId - The ID of the user.
 * @param {Object} unpaidTeam - The unpaid team to be saved.
 * @return {Promise<Object>} An object indicating the success or failure of the operation.
 * @throws {Error} If the user is not found.
 */
export async function saveUnpaidTeam(userId, unpaidTeam) {
	await connectToDatabase();

	try {
		const user = await User.findById(userId);

		if (!user) {
			throw new Error("User not found");
		}

		const newUnpaidTeams = user.unpaidTeams.filter((team) => {
			return team.division._id !== unpaidTeam.division._id;
		});

		user.unpaidTeams = [...newUnpaidTeams, unpaidTeam];
		await user.save();

		return { success: true, message: "Unpaid team saved successfully" };
	} catch (error) {
		console.error("Error saving unpaid team:", error);
		return { success: false, message: error.message };
	}
}
