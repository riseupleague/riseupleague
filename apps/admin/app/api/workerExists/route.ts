import { connectToDatabase } from "@/api-helpers/utils";
import Worker from "@/api-helpers/models/Worker";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await connectToDatabase();

		const { email } = await req.json();
		const worker = await Worker.findOne({ email }).select("_id");
		console.log("worker: ", worker);
		return NextResponse.json({ worker });
	} catch (error) {
		console.log(error);
	}
}
