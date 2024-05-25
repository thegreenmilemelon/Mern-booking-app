import express from "express";
import cors from "cors";
import "dotenv/config";

import { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //helps us parse url
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "hello from the express endpoint" });
});

app.listen(7000, () => {
  console.log("server is running on port 7000");
  console.log("http://localhost:7000/api/test");
});
