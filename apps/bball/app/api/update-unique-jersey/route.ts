import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import Team from "@/api-helpers/models/Team";
import Division from "@/api-helpers/models/Division";

/**
 * Updates the unique jersey of a team in a division.
 *
 * @param {Request} req - The request object containing the team and division IDs,
 *                        as well as the new primary, secondary, and tertiary colors,
 *                        and the new jersey edition.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object
 *                                  with the updated division information or an error message.
 */
export async function PATCH(req: Request) {
	try {
		await connectToDatabase();

		// Extract user data from the request body
		const {
			teamId,
			divisionId,
			primaryColor,
			secondaryColor,
			tertiaryColor,
			oldPrimaryColor,
			jerseyEdition,
			oldJerseyEdition,
		} = await req.json();

		// Check for required input fields
		if (!teamId || !divisionId || !jerseyEdition) {
			return NextResponse.json({ message: "Invalid Inputs" }, { status: 422 });
		}

		// Find the team by ID and update its properties
		const updatedTeam = await Team.findByIdAndUpdate(
			teamId,
			{
				$set: {
					primaryColor: primaryColor,
					secondaryColor: secondaryColor,
					tertiaryColor: tertiaryColor,
					jerseyEdition: jerseyEdition,
				},
			},
			{ new: true }
		);

		// Handle the rest of the code based on the existingPlayer
		const newTeam = await Team.findById(teamId);
		// Save the updated team
		await newTeam.save();

		const division = await Division.findById(divisionId);

		division.teamColors = division.teamColors.filter(
			(color) => color !== oldPrimaryColor
		);

		const newDivisionUniqueJersey = division.uniqueJersey.filter((jersey) => {
			return jersey !== oldJerseyEdition;
		});

		division.uniqueJersey = newDivisionUniqueJersey.concat(jerseyEdition);

		await division.save();

		if (!updatedTeam) {
			return NextResponse.json({ message: "Team not found" }, { status: 404 });
		}

		return NextResponse.json({ updatedDivision: division }, { status: 200 });
	} catch (error) {
		console.error("Error during team update:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
