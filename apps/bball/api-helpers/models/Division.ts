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
	teamsWithSchedule: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
	games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
	teamColors: { type: Array },
	uniqueJersey: { type: Array },
	location: { type: String, required: true },
	city: { type: String },
	day: { type: String, required: true },
	startTime: { type: String },
	endTime: { type: String },
	earlyBirdPrice: { type: String, required: true },
	earlyBirdTeamPrice: { type: String, required: true },
	regularPrice: { type: String, required: true },
	regularTeamPrice: { type: String, required: true },
	instalmentPrice: { type: String, required: true },
	description: { type: String, required: true },
	earlyBirdOpen: { type: Boolean, required: true },
	earlyBirdId: { type: String },
	earlyBirdTeamPriceId: { type: String },
	earlyBirdInstalmentId: { type: String },
	regularPriceFullId: { type: String },
	regularTeamPriceId: { type: String },
	regularPriceInstalmentId: { type: String },
	divisionColor: { type: String },
	firstInstalmentPrice: { type: String, required: true },
	firstInstalmentPriceId: { type: String, required: true },
});

export default mongoose.models.Division ||
	mongoose.model("Division", divisionSchema);
