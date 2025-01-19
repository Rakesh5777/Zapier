import { prisma } from "@repo/database";
import { Zap } from "../types/zap.types";

export const createZap = async (zap: Zap) => {
  // Insert zap and associated actions into the database
  await prisma.zap.create({
    data: {
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
