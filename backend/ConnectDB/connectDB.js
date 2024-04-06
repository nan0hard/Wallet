import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGODB_URI);
		console.log(
			`Successfully connected with MongoDB: ${connection.connection.host}`
		);
	} catch (error) {
		console.log(`Failed to connect with DB: ${error}`);
		process.exit(1);
	}
};

export default connectDB;
