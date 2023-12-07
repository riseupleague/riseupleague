"use server";

import Season from "@/api-helpers/models/Season";

export async function editSeasonAction(seasonData: any) {
	try {
		const season = await Season.findById(seasonData._id);

		if (!season) return { message: "No season found" };

		await Season.findByIdAndUpdate(seasonData._id, seasonData);

		console.log("200");
		return "200";
	} catch (e) {
		console.log(e);
		return "500";
	}
}
