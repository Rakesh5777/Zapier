import { prisma } from "@repo/database";
import { Zap } from "../types/zap.types";

export const createZap = async (userId: number, zap: Zap) => {
  // Insert zap and associated actions into the database
  await prisma.zap.create({
    data: {
      userId: userId,
      name: zap.name,
      triggerId: zap.triggerId,
      actions: {
        create: zap.actions.map((action) => ({
          type: action.type,
          sortingOrder: action.sortingOrder,
        })),
      },
      trigger: {
        create: {
          typeId: zap.triggerId,
        },
      },
    },
  });
};

export const getZaps = async (userId: number) => {
  return prisma.zap.findMany({
    where: {
      userId,
    },
    include: {
      actions: {
        select: {
          type: true,
          sortingOrder: true,
          availableAction: true,
        },
      },
      trigger: {
        select: {
          typeId: true,
          type: true,
        },
      },
    },
  });
};
