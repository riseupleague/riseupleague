import Season from "@/src/api-helpers/models/Season";
import { NextResponse } from "next/server";

export const getAllSeasons = async () => {
	try {
		let seasons = await Season.find();
		return NextResponse.json({ seasons });
	} catch (e) {
		return NextResponse.json(
			{ message: "error retrieving all seasons" },
			{ status: 500 }
		);
	}
};
