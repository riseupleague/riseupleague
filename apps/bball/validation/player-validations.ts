import { z } from "zod";

export const updatePlayerSchema = z.object({
	playerName: z.string().min(1, { message: "Player name is required." }),
	// instagram: z.string().min(1, { message: "Instagram is required." }),
	// jerseyName: z.string().min(1, { message: "Jersey name is required." }),
	// jerseyNumber: z.string().min(1, { message: "Jersey number is required." }),
	// jerseySize: z.string().min(1, { message: "Jersey size is required." }),
});

export const addPlayerSchema = z.object({
	playerName: z.string().min(1, { message: "Player name is required" }),
	teamId: z.string().min(1, { message: "Team ID is required" }),
});
