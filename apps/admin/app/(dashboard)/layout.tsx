import React from "react";
import Header from "@/components/structure/header/Header";
import Sidebar from "@/components/structure/sidebar/Sidebar";
import { Toaster } from "@ui/components/toaster";
import { connectToDatabase } from "@/api-helpers/utils";
import { getAllSeasons } from "@/api-helpers/controllers/seasons-controller";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	await connectToDatabase();

	// Fetch all seasons
	const resSeasons = await getAllSeasons();
	const { seasons } = await resSeasons.json();

	// Find the active season
	const activeSeason = seasons.find((season) => season.active === true);
	return (
		<div className="flex flex-col gap-y-4">
			<nav className="This is a shared navbar for dashboard segment"></nav>
			<Header activeSeason={activeSeason} />
			<main>
				<Sidebar activeSeason={activeSeason} />
				<div className="sm:ml-[189px]">
					<div className="container mx-auto py-4">{children}</div>
				</div>
			</main>
			<Toaster />
		</div>
	);
};

export default DashboardLayout;
