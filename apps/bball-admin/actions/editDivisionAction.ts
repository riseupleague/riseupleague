"use server";

import Division from "@/api-helpers/models/Division";
import { revalidatePath } from "next/cache";

export async function editDivisionAction(divisionData: any, id: string) {
	try {
		console.log(divisionData);
		const division = await Division.findById(divisionData._id);
		if (!division) return { status: 404 };

		await Division.findByIdAndUpdate(divisionData._id, divisionData);

		revalidatePath(`/team-management/division/${id}`);
		return { status: 200 };
	} catch (e) {
		return { status: 500 };
	}
}
