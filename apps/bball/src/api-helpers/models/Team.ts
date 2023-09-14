import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { PlayerDocument } from "./Player"; // Import the PlayerDocument type.
import { DivisionDocument } from "./Division"; // Import the DivisionDocument type.
import { SeasonDocument } from "./Season"; // Import the SeasonDocument type.
import { GameDocument } from "./Game"; // Import the GameDocument type.

// Define the schema for the Team model.
const teamSchema = new Schema({
	teamName: { type: String, required: true },
	teamNameShort: { type: String, required: true },
	teamBanner: { type: String },
	teamBannerId: { type: String },
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

// Define the interface for the Team document.
interface TeamDocument extends Document {
	teamName: string;
	teamNameShort: string;
	teamBanner?: string;
	teamBannerId?: string;
	wins: number;
	losses: number;
	pointDifference: number;
	players: PlayerDocument["_id"][];
	seasonStatistics: {
		points: number;
		rebounds: number;
		assists: number;
		blocks: number;
		steals: number;
		threesMade: number;
		twosMade: number;
		freeThrowsMade: number;
		gameId: string;
		teamId: string;
		game: GameDocument["_id"];
	}[];
	averageStats: {
		points: number;
		rebounds: number;
		assists: number;
		blocks: number;
		steals: number;
		threesMade: number;
		twosMade: number;
		freeThrowsMade: number;
	};
	games: GameDocument["_id"][];
	division: DivisionDocument["_id"];
	season: SeasonDocument["_id"];
}

// Define the interface for the Team model.
interface TeamModel extends Model<TeamDocument> {}

// Create the Team model.
const Team = mongoose.model<TeamDocument, TeamModel>("Team", teamSchema);

export default Team;
