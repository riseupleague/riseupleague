import { NextResponse } from "next/server";

export async function middleware(request) {
	try {
		return NextResponse.next();
	} catch (error) {
		// Handle errors gracefully
		console.error("Error fetching data from database:", error);
		// Return appropriate error response
		return new Response("Internal Server Error", { status: 500 });
	}
}
