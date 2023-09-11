import Season from "@/src/api-helpers/models/Season";
import { NextResponse } from "next/server";

export const getAllSeasons = async () => {
	try {
		const seasons = await Season.find();

		return NextResponse.json({ seasons });
	} catch (e) {
		return NextResponse.json(
			{ message: "error retrieving all seasons" },
			{ status: 500 }
		);
	}
};

export const getActiveSeason = async () => {
	try {
		const season = await Season.find({ active: true });

		return NextResponse.json({ season });
	} catch (e) {
		return NextResponse.json(
			{ message: "error retrieving active season" },
			{ status: 500 }
		);
	}
};
