import { Request, Response } from "express";
import { createZap } from "../services/zap.service";

export const createZapController = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user.userId;
    await createZap(userId, req.body);
    return res.status(200).json({ message: "Zap created successfully" });
  } catch (error) {
    console.error("Error creating zap:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
