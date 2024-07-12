import mongoose from "mongoose";
import Division from "@/api-helpers/models/Division";

const Schema = mongoose.Schema;

const seasonSchema = new Schema({
	seasonName: { type: String, required: true },
	active: { type: Boolean },
	register: { type: Boolean },
	divisions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Division" }],
	freePrice: { type: String },
	fullTeamPrice: { type: String },
});

export default mongoose.models.Season || mongoose.model("Season", seasonSchema);
