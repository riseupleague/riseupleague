import mongoose from "mongoose";
import Team from "@/api-helpers/models/Team";
import Division from "@/api-helpers/models/Division";
import Season from "@/api-helpers/models/Season";
import Game from "@/api-helpers/models/Game";

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		type: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		basketball: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Player",
			},
		],
		createdAt: { type: Date, default: Date.now }, // Added field to track creation date
	},
	{ timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
