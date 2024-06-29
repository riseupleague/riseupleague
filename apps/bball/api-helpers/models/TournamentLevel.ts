import mongoose from "mongoose";
import Team from "@/api-helpers/models/Team";
import Game from "@/api-helpers/models/Game";
import Season from "@/api-helpers/models/Season";

const Schema = mongoose.Schema;

const tournamentLevelSchema = new Schema({
	tournamentLevelName: { type: String, required: true },
	tournament: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tournament",
	},
	teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
	games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
	teamColors: { type: Array },
	price: { type: String },
	priceId: { type: String },
	divisionColor: { type: String },
});

export default mongoose.models.TournamentLevel ||
	mongoose.model("TournamentLevel", tournamentLevelSchema);
