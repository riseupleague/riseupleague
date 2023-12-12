"use server";

import Division from "@/api-helpers/models/Division";
import { revalidatePath } from "next/cache";

export async function reserveSlot(e, teamType: string) {
	try {
		console.log(e);
		console.log(teamType);
	} catch (e) {
		console.log(e);
		return { status: 500 };
	}
}
