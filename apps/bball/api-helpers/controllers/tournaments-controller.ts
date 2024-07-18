import { NextResponse } from "next/server";
import Tournament from "@/api-helpers/models/Tournament";
import TournamentDivision from "../models/TournamentDivision";
import TournamentLevel from "../models/TournamentLevel";
import TournamentTeam from "../models/TournamentTeam";
import TournamentPlayer from "../models/TournamentPlayer";

/**
 * Retrieves register tournament from the database.
 *
 * @return {Promise} An array of register tournament
 */
export const getRegisterTournament = async () => {
	try {
		// const tournament = await Tournament.find();

		// const registerTournament = await Tournament.find({ register: true });

		const registerTournamentArray = await Tournament.find({
			register: true,
		}).populate({
			path: "tournamentDivisions",
			populate: {
				path: "tournamentTeams",
			},
		});

		const registerTournament = registerTournamentArray[0];

		return NextResponse.json(
			{ tournament: registerTournament },
			{ status: 200 }
		);
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "error retrieving register tournament" },
			{ status: 500 }
		);
	}
};
