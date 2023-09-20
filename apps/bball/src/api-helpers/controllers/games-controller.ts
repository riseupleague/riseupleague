import { NextResponse } from "next/server";
import Game from "@/src/api-helpers/models/Game";
import Team from "@/src/api-helpers/models/Team";

export const getAllUpcomingGames = async () => {
	try {
		const allUpcomingGames = await Game.find();
		return NextResponse.json({ allUpcomingGames });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
