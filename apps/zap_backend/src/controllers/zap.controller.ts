import { Request, Response } from "express";
import { createZap, getZaps } from "../services/zap.service";

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

export const getZapController = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user.userId;
    const zaps = await getZaps(userId);
    return res.status(200).json(zaps);
  } catch (error) {
    console.error("Error getting zap:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};