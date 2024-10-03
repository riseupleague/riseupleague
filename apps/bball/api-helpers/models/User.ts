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
		phoneNumber: {
			type: String,
		},
		type: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		resetToken: {
			type: String,
		},
		resetTokenExpiry: {
			type: Date,
		},
		basketball: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Player",
			},
		],
		tournament: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "TournamentTeam",
			},
		],
		unpaidTeams: [
			{
				allowStep: { type: Array, required: true },
				division: { type: Object, required: true },
				players: { type: Array, required: true },
				step: { type: Number, required: true },
				teamCaptainDetails: { type: Object, required: true },
				teamDetails: { type: Object, required: true },
				checkboxes: { type: Object, required: true },
				createdAt: { type: Date, default: Date.now }, // Automatically deletes after 24 hours
			},
		],

		createdAt: { type: Date, default: Date.now }, // Added field to track creation date
	},
	{ timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
