import { connectToDatabase } from "@/src/api-helpers/utils";
import { getAllSeasons } from "@/src/api-helpers/controllers/seasons-controller";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
	try {
		await connectToDatabase();
		const res = await getAllSeasons();
		const { seasons } = await res.json();

		return NextResponse.json(seasons, { status: 200 });
	} catch (e) {
		return NextResponse.json(e, { status: 500 });
	}
};
