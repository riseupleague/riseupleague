// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/api-helpers/utils";

export async function userRedirectMiddleware(request: NextRequest) {
	await connectToDatabase();

	const session = await getServerSession();
	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	if (!session || !session.user) {
		return NextResponse.redirect("/");
	}

	return NextResponse.redirect(`/user/${user._id}`);
}
