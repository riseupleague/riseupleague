import mongoose from "mongoose";

const Schema = mongoose.Schema;

const seasonSchema = new Schema({
	seasonName: { type: String, required: true },
	active: { type: Boolean },
	register: { type: Boolean },
	employees: [
		{
			email: { type: String, required: true },
			player: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Player",
			},
		},
	],
	divisions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Division" }],
});

export default mongoose.models.Season || mongoose.model("Season", seasonSchema);
