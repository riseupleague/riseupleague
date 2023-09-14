import mongoose, { Schema, Document, Model } from "mongoose";
import { SeasonDocument } from "./Season"; // Import the SeasonDocument type.
import { TeamDocument } from "./Team"; // Import the TeamDocument type.
import { GameDocument } from "./Game"; // Import the GameDocument type.

// Define the schema for the Division model.
const divisionSchema = new Schema({
	divisionName: { type: String, required: true },
	season: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Season",
	},
	teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
	games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
});

// Define the interface for the Division document.
interface DivisionDocument extends Document {
	divisionName: string;
	season: SeasonDocument["_id"];
	teams: TeamDocument["_id"][];
	games: GameDocument["_id"][];
}

export type { DivisionDocument };

// Define the interface for the Division model.
interface DivisionModel extends Model<DivisionDocument> {}

// Create the Division model.
const Division = mongoose.model<DivisionDocument, DivisionModel>(
	"Division",
	divisionSchema
);

export default Division;
