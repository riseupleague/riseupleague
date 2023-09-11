import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
	const res = await fetch("https://dog.ceo/api/breeds/image/random");
	const data = await res.json();

	return NextResponse.json({ data });
}
