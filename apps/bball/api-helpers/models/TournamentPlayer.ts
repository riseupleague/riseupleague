import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tournamentPlayerSchema = new Schema({
	createdAt: { type: Date, default: Date.now }, // Added field to track creation date

	playerName: {
		type: String,
		required: true,
	},

	jerseyNumber: {
		type: Number,
	},

	jerseySize: {
		type: String,
	},
	jerseyName: {
		type: String,
	},
	tournamentTeam: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "TournamentTeam",
	},
	teamCaptain: {
		type: Boolean,
	},
	tournamentDivision: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "TournamentDivision",
	},
	tournamentLevel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "TournamentLevel",
	},
	tournament: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tournament",
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
tournamentPlayerSchema.index({ playerName: "text" });

export default mongoose.models.TournamentPlayer ||
	mongoose.model("TournamentPlayer", tournamentPlayerSchema);
