import mongoose from "mongoose";
import TournamentDivision from "./TournamentDivision";
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
	tournamentName: { type: String, required: true },
	regularPrice: { type: String, required: true },
	regularPriceId: { type: String, required: true },
	riseUpDiscountPrice: { type: String, required: true },
	riseUpDiscountPriceId: { type: String, required: true },
	otherLeagueDiscountPrice: { type: String, required: true },
	otherLeagueDiscountPriceId: { type: String, required: true },
	active: { type: Boolean },
	register: { type: Boolean },
	tournamentDivisions: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "TournamentDivision" },
	],
});

export default mongoose.models.Tournament ||
	mongoose.model("Tournament", tournamentSchema);
