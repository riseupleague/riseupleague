import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tournamentTeamSchema = new Schema({
	createdAt: { type: Date, default: Date.now }, // Added field to track creation date
	teamName: { type: String, required: true },
	teamNameShort: { type: String, required: true },
	jerseyEdition: { type: String },

	primaryColor: { type: String },
	secondaryColor: { type: String },
	tertiaryColor: { type: String },
	wins: { type: Number, default: 0 },
	losses: { type: Number, default: 0 },
	pointDifference: { type: Number, default: 0 },
	players: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "TournamentPlayer",
		},
	],
	seasonStatistics: [
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
				gameId: String,
				teamId: String,
				game: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "TournamentGame",
				},
			},
		},
	],
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
		},
	},
	tournamentGames: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "TournamentGame",
		},
	],
	level: { type: String, required: true },

	tournamentDivision: {
		type: Schema.Types.ObjectId,
		ref: "TournamentDivision",
		required: true,
	},
	tournament: {
		type: Schema.Types.ObjectId,
		ref: "Tournament",
		required: true,
	},
	teamCaptain: { type: String, required: true },
	instagram: { type: String },
	phoneNumber: { type: String, required: true },
});

tournamentTeamSchema.index({ players: 1 });

export default mongoose.models.TournamentTeam ||
	mongoose.model("TournamentTeam", tournamentTeamSchema);
