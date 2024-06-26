import { NextResponse } from "next/server";

import Worker from "@/api-helpers/models/Worker";

export const getCurrentWorker = async (email: string) => {
	try {
		const worker = await Worker.findOne({ email });

		return NextResponse.json({
			worker,
		});
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getWorkerByEmail = async (email: string) => {
	try {
		const worker = await Worker.findOne({ email });

		return NextResponse.json({
			worker,
		});
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getWorkerById = async (id: string) => {
	try {
		const worker = await Worker.findById({ id });

		return NextResponse.json({
			worker,
		});
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
