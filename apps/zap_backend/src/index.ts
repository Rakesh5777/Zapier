import express, { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import zapRouter from "./routes/zap.route";
import { zapSchema } from "./types/zap.types";
import { prisma } from "@repo/database";

config();

const app = express();
const PORT = process.env.ZAP_BACKEND_PORT!;

app.use(express.json());

app.use("/api/v1/zap", zapRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
