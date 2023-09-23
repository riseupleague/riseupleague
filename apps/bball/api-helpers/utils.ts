import mongoose from "mongoose";

const uri: string = process.env.MONGODB_URI as string;

export const connectToDatabase = async () => {
	try {
		await mongoose.connect(uri);

		require("./models/Division");
		require("./models/Game");
		require("./models/Player");
		require("./models/Season");
		require("./models/Team");

		console.log("connected to mongoDB");
	} catch (e) {
		console.log("cannot connect to mongoDB: ", e);
	}
};
