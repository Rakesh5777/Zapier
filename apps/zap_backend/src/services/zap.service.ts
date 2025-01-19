import { prisma } from "@repo/database";
import { Zap } from "../types/zap.types";

export const createZap = async (userId: number, zap: Zap) => {
  // Insert zap and associated actions into the database
  await prisma.zap.create({
    data: {
      userId: userId,
      triggerId: zap.triggerId,
      actions: {
        create: zap.actions.map((action) => ({
          type: action.type,
          sortingOrder: action.sortingOrder,
        })),
      },
    },
  });
};
