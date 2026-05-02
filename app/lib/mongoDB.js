import mongoose from "mongoose";


export async function dbConnect() {
	if (!process.env.MONGO_URI) {
		throw new Error("Please define the Database");
	}
	let connect = await mongoose.connect(process.env.MONGO_URI);
    return mongoose;
}
