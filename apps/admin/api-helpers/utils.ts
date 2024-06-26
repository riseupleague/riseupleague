// import mongoose from "mongoose";

// // eslint-disable-next-line turbo/no-undeclared-env-vars
// const uri: string = process.env.MONGODB_URI as string;

// export const connectToDatabase = async () => {
// 	try {
// 		await mongoose.connect(uri);
// 		require("./models/Division");
// 		require("./models/Game");
// 		require("./models/Player");
// 		require("./models/Season");
// 		require("./models/Team");
// 		require("./models/Worker");
// 		require("./models/User");
// 		console.log("connected to mongoDB");
// 	} catch (e) {
// 		console.log("cannot connect to mongoDB: ", e);
// 	}
// };

import mongoose from "mongoose";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const uri: string = process.env.MONGODB_URI as string;

let cached = globalThis.mongoose;

if (!cached) {
	cached = globalThis.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			// Add any additional options here
		};

		cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
			require("./models/Division");
			require("./models/Game");
			require("./models/Player");
			require("./models/Season");
			require("./models/Team");
			require("./models/Worker");
			require("./models/User");
			return mongoose;
		});
	}

	try {
		cached.conn = await cached.promise;
		console.log("Connected to MongoDB");
		return cached.conn;
	} catch (e) {
		cached.promise = null;
		console.error("Cannot connect to MongoDB: ", e);
		throw e;
	}
};
