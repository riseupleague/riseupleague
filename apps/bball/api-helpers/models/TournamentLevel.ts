import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tournamentLevelSchema = new Schema({
	tournamentLevelName: { type: String, required: true },
	tournament: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tournament",
	},
	tournamentDivision: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "TournamentDivision",
	},
	tournamentTeams: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "TournamentTeam" },
	],
	tournamentGames: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "TournamentGame" },
	],
});

export default mongoose.models.TournamentLevel ||
	mongoose.model("TournamentLevel", tournamentLevelSchema);
