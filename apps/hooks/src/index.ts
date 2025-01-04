import express from "express";
import { prisma } from "@repo/database";

const app = express();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const { userId, zapId } = req.params;
  const { body } = req;

  await prisma.$transaction(async (tx) => {
    // create zap run
    const run = await tx.zapRun.create({
      data: {
        zapId,
        metadata: body,
      },
    });

    // create zap run outbox
    await tx.zapRunOutbox.create({
      data: {
        zapId,
        zapRunId: run.id,
      },
    });
  });

  res.send("OK");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
