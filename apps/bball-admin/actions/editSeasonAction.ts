"use server";

import Season from "@/api-helpers/models/Season";

export async function editSeasonAction(id: any, formData: FormData) {
	try {
		const seasonName = formData.get("seasonName");
		const register = formData.get("register");
		const active = formData.get("active");

		const seasonData = { _id: id, seasonName, register, active };

		const season = await Season.findById(seasonData._id);

		if (!season) {
			console.log("404");
			return "404";
		}

		await Season.findByIdAndUpdate(seasonData._id, seasonData);
		console.log("200");
		return "200";
	} catch (e) {
		console.log(e);
		return "500";
	}
}
