import express from "express";
import { config } from "dotenv";
import zapRouter from "./routes/zap.route";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app = express();
const PORT = process.env.ZAP_BACKEND_PORT!;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
