import mongoose from "mongoose";
import Team from "@/src/api-helpers/models/Team";
import Game from "@/src/api-helpers/models/Game";
import Season from "@/src/api-helpers/models/Season";

const Schema = mongoose.Schema;

const divisionSchema = new Schema({
	divisionName: { type: String, required: true },
	season: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Season",
	},
	teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
	games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
});

export default mongoose.models.Division ||
	mongoose.model("Division", divisionSchema);
