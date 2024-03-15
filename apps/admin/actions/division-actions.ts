"use server";

import Division from "@/api-helpers/models/Division";
import Season from "@/api-helpers/models/Season";
import { revalidatePath } from "next/cache";

export async function addSeason(seasonData: any, id: string) {
	try {
		console.log(seasonData);
		return;

		const season = await Season.findById(seasonData._id);
		if (!season) return { status: 404 };

		await Season.findByIdAndUpdate(seasonData._id, seasonData);

		revalidatePath(`/seasons-management/season/${id}`);
		return { status: 200 };
	} catch (e) {
		console.log(e);
		return { status: 500 };
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
