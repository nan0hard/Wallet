import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./ConnectDB/connectDB.js";
import userRouter from "./routes/user.routes.js";
import accountRouter from "./routes/account.routes.js";

dotenv.config({
	path: "./.env.local",
});

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running at http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.log(`Error while connecting with DB: ${err}`);
	});
