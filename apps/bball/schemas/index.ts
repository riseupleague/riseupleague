import { z } from "zod";

export const createTeamSchema = z.object({
	teamName: z.string().nonempty("Team Name is required"),
	teamNameShort: z
		.string()
		.max(4, "Short Team Name must be 4 letters or less")
		.nonempty("Short Team Name is required"),
	teamCode: z.string().nonempty("Team Code is required"),
	playerName: z.string().nonempty("Player Name is required"),
	instagram: z.string().optional(),
	phoneNumber: z
		.string()
		.nonempty("Phone number is required")
		.refine(validatePhoneNumber, {
			message: "Invalid phone number format",
		}),
	jerseySize: z.string().nonempty("Jersey Size is required"),
	jerseyName: z.string().nonempty("Jersey Name is required").max(
		12,
		"Your jersey name is too long. Choose a jersey name of up to 12 characters."
	),
	jerseyNumber: z
	.string()
	.nonempty("Jersey number is required").max(3, "Please limit to three digits")
	.refine(validateJerseyNumber, {
		message: "Please input a number",
	}),
});



export const buildRosterSchema = z
	.array(
		z.object({
			id: z.number(),
			name: z.string().min(1, "Player name is required"),
		})
	)
	.min(6, "At least 6 players are required");

export const jerseyDetailSchema = z.object({
	jerseyTeamName: z
		.string()
		.min(1, "Please add a team name.")
		.max(
			10,
			"Your team name is too long. Choose a team name of up to 10 characters."
		),
	customJersey: z.boolean(),
});



function validatePhoneNumber(phoneNumber) {
	// Regular expression to match a valid Canadian phone number
	const phoneRegex =
		/^(?:\+?1[- ]?)?\(?(?:[2-9][0-9]{2})\)?[- ]?(?:[2-9][0-9]{2})[- ]?(?:[0-9]{4})$/;

	// Check if the phone number matches the regular expression
	if (phoneRegex.test(phoneNumber)) {
		return true; // Phone number is valid
	} else {
		return false; // Phone number is invalid
	}
}

function validateJerseyNumber(jerseyNumber) {
	// Check if the string can be converted to a valid number
	const number = Number(jerseyNumber);
	if (isNaN(number)) {
	  return false;
	}
  
	// Additional check to ensure the string is a valid representation of a number
	return jerseyNumber.trim() !== '' && !isNaN(parseFloat(jerseyNumber));
  }