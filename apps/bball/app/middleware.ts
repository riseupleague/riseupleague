// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/api-helpers/utils";

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/user")) {
		await connectToDatabase();

		const session = await getServerSession();
		const resUser = await getCurrentUser(session.user.email);
		const { user } = await resUser.json();

		if (!session || !session.user) {
			return NextResponse.redirect("/");
		}

		return NextResponse.rewrite(new URL(`/user/${user._id}`, request.url));
	}
}
