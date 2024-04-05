import mongoose from "mongoose";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const uri: string = process.env.MONGODB_URI as string;

export const connectToDatabase = async () => {
	try {
		await mongoose.connect(uri);

		require("./models/Division");
		require("./models/Game");
		require("./models/Player");
		require("./models/Season");
		require("./models/Team");
		require("./models/Worker");
		require("./models/User");
		console.log("connected to mongoDB");
	} catch (e) {
		console.log("cannot connect to mongoDB: ", e);
	}
};
