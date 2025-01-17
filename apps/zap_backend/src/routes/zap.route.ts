import express, { Request, Response } from "express";
import { zapSchema } from "../types/zap.types";
import { prisma } from "@repo/database";

const zapRouter = express.Router();

zapRouter.post("/", async (req: Request, res: Response) => {
  const zap = zapSchema.parse(req.body);
  if (!zap) {
    return res.status(400).json({
      message: "Invalid zap",
    });
  }

  await prisma.zap.create({
    data: {
      triggerId: zap.triggerId,
      actions: {
        create: zap.actions.map((z) => ({
          type: z.type,
          sortingOrder: z.sortingOrder,
        })),
      },
    },
  });

  return res.status(200).json({
    message: "Zap created",
  });
});

export default zapRouter;
