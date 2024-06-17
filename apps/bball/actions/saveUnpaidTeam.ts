"use server";

import User from "@/api-helpers/models/User";
import { connectToDatabase } from "@/api-helpers/utils";

export async function saveUnpaidTeam(userId, unpaidTeam) {
	await connectToDatabase();

	try {
		const user = await User.findById(userId);
		console.log("user:", user);

		if (!user) {
			throw new Error("User not found");
		}

		const newUnpaidTeams = user.unpaidTeams.filter((team) => {
			console.log(team.division._id, unpaidTeam.division._id);
			return team.division._id !== unpaidTeam.division._id;
		});
		console.log("isUnpaidTeamActive:", newUnpaidTeams);
		user.unpaidTeams = [...newUnpaidTeams, unpaidTeam];
		await user.save();

		return { success: true, message: "Unpaid team saved successfully" };
	} catch (error) {
		console.error("Error saving unpaid team:", error);
		return { success: false, message: error.message };
	}
}
