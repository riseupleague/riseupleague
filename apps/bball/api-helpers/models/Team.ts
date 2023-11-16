import mongoose from "mongoose";
import Player from "@/api-helpers/models/Player";
import Game from "@/api-helpers/models/Game";
import Division from "@/api-helpers/models/Division";
import Season from "@/api-helpers/models/Season";

const Schema = mongoose.Schema;

const teamSchema = new Schema({
	teamName: { type: String, required: true },
	teamNameShort: { type: String, required: true },
	teamCode: { type: String, required: true },
	teamBanner: { type: String },
	teamBannerId: { type: String },
	teamCaptain: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Player",
	},
	primaryColor: { type: String },
	secondaryColor: { type: String },
	tertiaryColor: { type: String },
	wins: { type: Number, default: 0 },
	losses: { type: Number, default: 0 },
	pointDifference: { type: Number, default: 0 },
	players: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Player",
		},
	],
	seasonStatistics: [
		{
			type: {
				points: Number,
				rebounds: Number,
				assists: Number,
				blocks: Number,
				steals: Number,
				threesMade: Number,
				twosMade: Number,
				freeThrowsMade: Number,
				gameId: String,
				teamId: String,
				game: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Game",
				},
			},
		},
	],
	averageStats: {
		type: {
			points: Number,
			rebounds: Number,
			assists: Number,
			blocks: Number,
			steals: Number,
			threesMade: Number,
			twosMade: Number,
			freeThrowsMade: Number,
		},
	},
	games: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Game",
		},
	],
	division: {
		type: Schema.Types.ObjectId,
		ref: "Division",
		required: true,
	},
	season: {
		type: Schema.Types.ObjectId,
		ref: "Season",
		required: true,
	},
});

teamSchema.index({ players: 1 });

export default mongoose.models.Team || mongoose.model("Team", teamSchema);
