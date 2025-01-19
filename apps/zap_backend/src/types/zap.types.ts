import { z } from "zod";

export const zapSchema = z.object({
  triggerId: z.string(),
  actions: z.array(
    z.object({
      type: z.string(),
      sortingOrder: z.number(),
    })
  ),
});

export type Zap = z.infer<typeof zapSchema>;
