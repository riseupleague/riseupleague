"use server";

import { cookies } from "next/headers";

export const promoBannerAction = async () => {
	const cookieStore = cookies();

	if (cookieStore.has("promoBanner")) {
		console.log("Cookie already exists");
		return false;
	}

	cookieStore.set("promoBanner", "true", {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		maxAge: 86400,
	});

	return true;
};
