import mongoose from "mongoose";
import Team from "@/api-helpers/models/Team";
import Game from "@/api-helpers/models/Game";
import Season from "@/api-helpers/models/Season";

const Schema = mongoose.Schema;

const divisionSchema = new Schema({
	divisionName: { type: String, required: true },
	season: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Season",
	},
	teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
	games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
	location: { type: String },
	city: { type: String },
	day: { type: String },
	startTime: { type: String },
	endTime: { type: String },
	earlyBirdPrice: { type: String },
	regularPrice: { type: String },
	instalmentPrice: { type: String },
	description: { type: String },
	earlyBirdOpen: { type: Boolean },
	earlyBirdId: { type: String },
	regularPriceFullId: { type: String },
	regularPriceInstalmentId: { type: String },
	divisionColor: { type: String },
});

export default mongoose.models.Division ||
	mongoose.model("Division", divisionSchema);
