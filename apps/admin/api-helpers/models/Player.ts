import mongoose from "mongoose";
import Team from "@/api-helpers/models/Team";
import Division from "@/api-helpers/models/Division";
import Season from "@/api-helpers/models/Season";
import Game from "@/api-helpers/models/Game";

const Schema = mongoose.Schema;

const playerSchema = new Schema({
	createdAt: { type: Date, default: Date.now }, // Added field to track creation date
	freeAgent: {
		type: Boolean,
	},
	customerId: {
		type: String,
	},
	playerName: {
		type: String,
		required: true,
	},
	instagram: {
		type: String,
	},
	jerseyNumber: {
		type: Number,
	},
	jerseySize: {
		type: String,
	},
	shortSize: {
		type: String,
	},
	jerseyName: {
		type: String,
	},
	team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
	},
	teamCaptain: {
		type: Boolean,
	},
	division: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Division",
	},
	season: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Season",
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	averageStats: {
		type: {
			points: Number,
			rebounds: Number,
			assists: Number,
			blocks: Number,
			steals: Number,
			threesMade: Number,
			twosMade: Number,
			freeThrowsMade: Number,
			threesMiss: Number,
			twosMiss: Number,
			freeThrowsMiss: Number,
			fouls: Number,
			turnovers: Number,
		},
	},
	allStats: [
		{
			type: {
				points: Number,
				rebounds: Number,
				assists: Number,
				blocks: Number,
				steals: Number,
				threesMade: Number,
				twosMade: Number,
				freeThrowsMade: Number,
				threesMiss: Number,
				twosMiss: Number,
				freeThrowsMiss: Number,
				fouls: Number,
				turnovers: Number,
				shotChartLists: Array,
				game: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Game",
				},
				teamId: String,
			},
		},
	],
});

// Create a text index on the "playerName" field
playerSchema.index({ playerName: "text" });

export default mongoose.models.Player || mongoose.model("Player", playerSchema);
