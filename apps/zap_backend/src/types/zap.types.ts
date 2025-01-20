import { z } from "zod";

export const zapSchema = z.object({
  name: z.string(),
  triggerId: z.string(),
  actions: z.array(
    z.object({
      type: z.string(),
      sortingOrder: z.number(),
    })
  ),
});

export type Zap = z.infer<typeof zapSchema>;
