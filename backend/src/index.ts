import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import { Request, Response } from "express";
import userRoutes from "./routes/users";

mongoose.connect(process.env.MONGODB_URI as string).then(() => {
  console.log("Connected to MongoDB");
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //helps us parse url
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "hello from the express endpoint" });
});

app.use("/api/users", userRoutes);

app.listen(7000, () => {
  console.log("server is running on port 7000");
  console.log("http://localhost:7000/api/test");
});
