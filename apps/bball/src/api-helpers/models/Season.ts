import mongoose from "mongoose";

const Schema = mongoose.Schema;

const seasonSchema = new Schema({
	seasonName: { type: String, required: true },
	active: { type: Boolean },
	division: [{ type: mongoose.Schema.Types.ObjectId, ref: "Division" }],
});

export default mongoose.models.Season || mongoose.model("Season", seasonSchema);
