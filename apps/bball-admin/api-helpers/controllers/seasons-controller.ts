import Season from "@/api-helpers/models/Season";
import Team from "@/api-helpers/models/Team";
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

export const addSeasons = async ({ request }) => {
	try {
		// const seasons = await Season.find();
		// return NextResponse.json({ seasons });
	} catch (e) {
		return NextResponse.json(
			{ message: "error retrieving all seasons" },
			{ status: 500 }
		);
	}
};

export const getSeasonById = async (id: string) => {
	try {
		const season = await Season.findOne({ _id: id });

		return NextResponse.json({ season });
	} catch (e) {
		return NextResponse.json(
			{ message: "error retrieving active season" },
			{ status: 500 }
		);
	}
};
