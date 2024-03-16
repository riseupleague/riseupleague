"use server";

import Division from "@/api-helpers/models/Division";
import Season from "@/api-helpers/models/Season";
import { revalidatePath } from "next/cache";

export async function addDivision(seasonId: string, divisionData: FormData) {
	try {
		const season = await Season.findById(seasonId);
		if (!season) return { status: 404, message: "No season found." };

		const rawDivisionData = {
			divisionName: divisionData.get("name"),
			season: seasonId,
			location: divisionData.get("location"),
			city: divisionData.get("city"),
			day: divisionData.get("day"),
			startTime: divisionData.get("startTime"),
			endTime: divisionData.get("endTime"),
			earlyBirdPrice: divisionData.get("earlyBirdPrice"),
			regularPrice: divisionData.get("regularPrice"),
			instalmentPrice: divisionData.get("instalmentPrice"),
			description: divisionData.get("description"),
			earlyBirdOpen: divisionData.get("earlyBirdOpen") ? true : false,
			earlyBirdId: divisionData.get("earlyBirdId"),
			regularPriceFullId: divisionData.get("regularPriceFullId"),
			regularPriceInstalmentId: divisionData.get("regularPriceInstalmentId"),
		};

		const division = new Division(rawDivisionData);
		const savedDivision = await division.save();

		season.divisions = season.divisions.concat(savedDivision._id);
		await season.save();

		if (!season) return { status: 500, message: "Internal server error." };

		revalidatePath("/");

		return { status: 201, message: "Successfully added division." };
	} catch (e) {
		return { status: 500, message: "Internal server error." };
	}
}

export async function editDivision(divisionData: any, id: string) {
	try {
		const division = await Division.findById(divisionData._id);
		if (!division) return { status: 404 };

		await Division.findByIdAndUpdate(divisionData._id, divisionData);

		revalidatePath(`/team-management/division/${id}`);
		return { status: 200 };
	} catch (e) {
		return { status: 500 };
	}
}
