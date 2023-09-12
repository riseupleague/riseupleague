import { connectToDatabase } from "@/src/api-helpers/utils";
import {
	getActiveSeason,
	getAllSeasons,
	getSeasonById,
} from "@/src/api-helpers/controllers/seasons-controller";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
	try {
		await connectToDatabase();

		const { searchParams } = new URL(req.url);
		const active = searchParams.get("active");
		const id = searchParams.get("id");

		// if active param in request
		if (active) {
			const res = await getActiveSeason();
			const { season } = await res.json();

			return NextResponse.json(season, { status: 200 });
		}

		// if id param in request
		if (id) {
			const res = await getSeasonById(id);
			const { season } = await res.json();

			return NextResponse.json(season, { status: 200 });
		}

		// if not, get all seasons
		const res = await getAllSeasons();
		const { seasons } = await res.json();

		return NextResponse.json(seasons, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json(e, { status: 500 });
	}
};
