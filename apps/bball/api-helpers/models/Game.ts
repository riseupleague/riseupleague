import mongoose from "mongoose";

import Team from "@/api-helpers/models/Team";
import Division from "@/api-helpers/models/Division";
import Season from "@/api-helpers/models/Season";
import Player from "@/api-helpers/models/Player";

const Schema = mongoose.Schema;

const gameSchema = new Schema({
	gameName: { type: String, required: true },
	date: { type: Date },
	time: { type: String },
	homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
	awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
	homeTeamScore: { type: Number, required: true },
	awayTeamScore: { type: Number, required: true },
	status: { type: Boolean, required: true },
	division: { type: mongoose.Schema.Types.ObjectId, ref: "Division" },
	season: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Season",
	},
	location: { type: String, required: true }, // Add the location field
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
	playerOfTheGame: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
	potg: {
		type: {
			image: String,
			id: String,
		},
	},
	playByPlay: [
		{
			type: {
				playerName: String,
				playerId: String,
				playId: String,
				playerNumber: Number,
				stat: String,
				homeTeamScore: Number,
				awayTeamScore: Number,
				team: String,
			},
		},
	],
	started: { type: Boolean, required: true },
	youtubeLink: { type: String },
});

export default mongoose.models.Game || mongoose.model("Game", gameSchema);
