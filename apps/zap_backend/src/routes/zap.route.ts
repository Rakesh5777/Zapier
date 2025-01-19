import express, { Request, Response } from "express";
import { zapSchema } from "../types/zap.types";
import { prisma } from "@repo/database";
import { createZapController } from "../controllers/zap.controller";
import { validateRequest } from "../middleware/validateRequest.middleware";
import { authenticate } from "../middleware/auth.middleware";

const zapRouter = express.Router();

zapRouter.post(
  "/",
  validateRequest(zapSchema),
  authenticate,
  createZapController
);

export default zapRouter;
