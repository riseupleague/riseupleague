import mongoose from "mongoose";
import TournamentLevel from "./TournamentLevel";
const Schema = mongoose.Schema;

const tournamentDivisionSchema = new Schema({
	tournamentDivisionName: { type: String, required: true },
	tournament: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tournament",
	},
	tournamentTeams: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "TournamentTeam" },
	],
	tournamentGames: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "TournamentGame" },
	],
	level: { type: String, required: true },
	location: { type: String },
	city: { type: String },
});

export default mongoose.models.TournamentDivision ||
	mongoose.model("TournamentDivision", tournamentDivisionSchema);
