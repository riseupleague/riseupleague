import { Request, Response } from "express";
import Division, { DivisionDocument } from "../models/Division";
import Season, { SeasonDocument } from "../models/Season";

export const getAllDivisions = async (req: Request, res: Response) => {
	try {
		let divisions: DivisionDocument[];
		if (req.query.seasonId) {
			divisions = await Division.find({ season: req.query.seasonId })
				.populate("teams", "teamName")
				.select("divisionName season teams");
		} else {
			divisions = await Division.find()
				.populate("teams", "teamName teamNameShort")
				.select("divisionName season teams");
		}

		if (!divisions) {
			return res.status(500).json({ message: "Internal Server Error" });
		}

		if (divisions.length === 0) {
			return res.status(404).json({ message: "No divisions found" });
		}

		return res.status(200).json({ divisions });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getDivisionFromId = async (req: Request, res: Response) => {
	const id = req.query.id as string; // Ensure 'id' is a string.

	try {
		let division: DivisionDocument | null;

		division = await Division.findById(id).populate("teams");

		if (!division) {
			return res.status(500).json({ message: "Internal Server Error" });
		}

		return res.status(200).json({ division });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
