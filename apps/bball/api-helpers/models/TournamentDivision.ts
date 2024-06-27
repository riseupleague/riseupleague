import mongoose from "mongoose";
import Team from "@/api-helpers/models/Team";
import Game from "@/api-helpers/models/Game";
import Season from "@/api-helpers/models/Season";

const Schema = mongoose.Schema;

const tournamentDivisionSchema = new Schema({
	tournamentDivisionName: { type: String, required: true },
	tournament: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tournament",
	},
	tournamentSubDivision: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "TournamentSubDivision",
	},
	location: { type: String, required: true },
	city: { type: String },
});

export default mongoose.models.TournamentDivision ||
	mongoose.model("TournamentDivision", tournamentDivisionSchema);
