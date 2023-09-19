import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gameSchema = new Schema({
	gameName: { type: String, required: true },
	date: {
		type: Date,
		required: true,
	},
	homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
	awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
	homeTeamScore: { type: Number, required: true },
	awayTeamScore: { type: Number, required: true },
	status: { type: Boolean, required: true },
	division: { type: mongoose.Schema.Types.ObjectId, ref: "Division" },
	season: { type: String, required: true },
	location: { type: String, required: true }, // Add the location field
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
	playerOfTheGame: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
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
});

export default mongoose.models.Game || mongoose.model("Game", gameSchema);
