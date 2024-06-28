import mongoose from "mongoose";
import Division from "@/api-helpers/models/Division";

const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
	tournamentName: { type: String, required: true },
	active: { type: Boolean },
	register: { type: Boolean },
	divisions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Division" }],
});

export default mongoose.models.Tournament ||
	mongoose.model("Tournament", tournamentSchema);
