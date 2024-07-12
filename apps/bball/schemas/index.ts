import { z } from "zod";

// Roster Schema with additional fields
export const buildTournamentRosterSchema = z
	.array(
		z.object({
			id: z.number(),
			name: z.string().min(1, "Player name is required"),
			jerseySize: z.string().nonempty("Jersey Size is required"),
			jerseyName: z
				.string()
				.nonempty("Jersey Name is required")
				.max(
					12,
					"Your jersey name is too long. Choose a jersey name of up to 12 characters."
				),
			jerseyNumber: z
				.string()
				.nonempty("Jersey number is required")
				.max(3, "Please limit to three digits")
				.refine(validateJerseyNumber, {
					message: "Please input a number",
				}),
		})
	)
	.min(4, "At least 4 additional players are required");

export const createTeamTournamentSchema = z.object({
	teamName: z.string().nonempty("Team Name is required"),
	teamNameShort: z
		.string()
		.max(4, "Short Team Name must be 4 letters or less")
		.nonempty("Short Team Name is required"),
	teamCaptainName: z.string().nonempty("Team captain name is required"),
	instagram: z.string().optional(),
	phoneNumber: z
		.string()
		.nonempty("Phone number is required")
		.refine(validatePhoneNumber, {
			message: "Invalid phone number format",
		}),
	// teamCaptainJerseySize: z.string().nonempty("Jersey Size is required"),
	// teamCaptainJerseyName: z
	// 	.string()
	// 	.nonempty("Jersey Name is required")
	// 	.max(
	// 		12,
	// 		"Your jersey name is too long. Choose a jersey name of up to 12 characters."
	// 	),
	// teamCaptainJerseyNumber: z
	// 	.string()
	// 	.nonempty("Jersey number is required")
	// 	.max(3, "Please limit to three digits")
	// 	.refine(validateJerseyNumber, {
	// 		message: "Please input a number",
	// 	}),
	// roster: buildTournamentRosterSchema,
});
// .superRefine((data, ctx) => {
// 	const jerseyNumberCounts = {};

// 	// Include the team captain's jersey number in the counts
// 	const allPlayers = [
// 		{ jerseyNumber: data.teamCaptainJerseyNumber },
// 		...data.roster,
// 	];

// 	allPlayers.forEach((player, index) => {
// 		if (jerseyNumberCounts[player.jerseyNumber]) {
// 			jerseyNumberCounts[player.jerseyNumber]++;
// 		} else {
// 			jerseyNumberCounts[player.jerseyNumber] = 1;
// 		}
// 	});

// 	allPlayers.forEach((player, index) => {
// 		if (jerseyNumberCounts[player.jerseyNumber] > 1) {
// 			ctx.addIssue({
// 				code: z.ZodIssueCode.custom,
// 				message: `Duplicate jersey number: ${player.jerseyNumber} found`,
// 				path:
// 					index === 0
// 						? ["teamCaptainJerseyNumber"]
// 						: ["roster", index - 1, "jerseyNumber"],
// 			});
// 		}
// 	});
// });

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
	jerseyName: z
		.string()
		.nonempty("Jersey Name is required")
		.max(
			12,
			"Your jersey name is too long. Choose a jersey name of up to 12 characters."
		),
	jerseyNumber: z
		.string()
		.nonempty("Jersey number is required")
		.max(3, "Please limit to three digits")
		.refine(validateJerseyNumber, {
			message: "Please input a number",
		}),
});

export const joinTeamSchema = (existingJerseyNumbers: string[]) =>
	z.object({
		playerName: z.string().nonempty("Player Name is required"),
		instagram: z.string().optional(),
		phoneNumber: z
			.string()
			.nonempty("Phone number is required")
			.refine(validatePhoneNumber, {
				message: "Invalid phone number format",
			}),
		jerseySize: z.string().nonempty("Jersey Size is required"),
		jerseyName: z
			.string()
			.nonempty("Jersey Name is required")
			.max(
				12,
				"Your jersey name is too long. Choose a jersey name of up to 12 characters."
			),
		jerseyNumber: z
			.string()
			.nonempty("Jersey number is required")
			.max(3, "Please limit to three digits")
			.refine(validateJerseyNumber, {
				message: "Please input a number",
			})
			.refine((num) => !existingJerseyNumbers.includes(num), {
				message: "Jersey number already taken. Please choose another number.",
			}),
		agreeToTerms: z.boolean().refine((val) => val === true, {
			message: "You must agree to the Terms and Conditions",
		}),
		agreeToRefundPolicy: z.boolean().refine((val) => val === true, {
			message: "You must agree to the Refund Policy",
		}),
		receiveNews: z.boolean().optional(),
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
	return jerseyNumber.trim() !== "" && !isNaN(parseFloat(jerseyNumber));
}
