import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import { Request, Response } from "express";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import hotelRoutes from "./routes/hotels";
import bookingRoutes from "./routes/my-bookings";

import cookieParser from "cookie-parser";
import path from "path";

import { v2 as cloudinary } from "cloudinary";
import myHotelRoutes from "./routes/my-hotels";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_URI as string).then(() => {
  console.log("Connected to MongoDB");
});
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //helps us parse url
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "hello from the express endpoint" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(7000, () => {
  console.log("server is running on port 7000");
  console.log("http://localhost:7000/api/test");
});
