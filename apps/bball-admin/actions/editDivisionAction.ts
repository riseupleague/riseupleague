"use server";

import Season from "@/api-helpers/models/Season";
import Division from "@/api-helpers/models/Division";

export async function editDivisionAction(divisionData: any) {
	try {
		const division = await Division.findById(divisionData._id);

		if (!division) return { message: "No division found" };

		await Division.findByIdAndUpdate(divisionData._id, divisionData);

		console.log("200");
		return { message: "Division successfully updated" };
	} catch (e) {
		return { error: e };
	}
}
