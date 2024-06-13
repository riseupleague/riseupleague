import { z } from "zod";

export const createTeamSchema = z.object({
	teamName: z.string().nonempty("Team Name is required"),
	teamNameShort: z
		.string()
		.max(4, "Short Team Name must be 4 letters or less")
		.nonempty("Short Team Name is required"),
	teamCode: z.string().nonempty("Team Code is required"),
	playerName: z.string().nonempty("Player Name is required"),
	instagram: z.string().nonempty("Instagram Handle is required"),
	jerseySize: z.string().nonempty("Jersey Size is required"),
	jerseyName: z.string().nonempty("Jersey Name is required"),
	jerseyNumber: z.string().nonempty("Jersey Number is required"),
});
