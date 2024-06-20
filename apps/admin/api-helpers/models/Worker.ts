import mongoose from "mongoose";
import Team from "@/api-helpers/models/Team";
import Division from "@/api-helpers/models/Division";
import Season from "@/api-helpers/models/Season";
import Game from "@/api-helpers/models/Game";

const Schema = mongoose.Schema;

const workerSchema = new Schema(
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
	},
	{ timestamps: true }
);

export default mongoose.models.Worker || mongoose.model("Worker", workerSchema);
