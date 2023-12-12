"use server";

import Season from "@/api-helpers/models/Season";
import { revalidatePath } from "next/cache";

export async function editSeasonAction(seasonData: any, id: string) {
	try {
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
