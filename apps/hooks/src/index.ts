import express from "express";
import { prisma } from "@repo/database";

const app = express();
const PORT = process.env.HOOKS_PORT!;

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const { userId, zapId } = req.params;
  const { body } = req;

  const user = await prisma.user.findFirst({
    where: { id: +userId },
  });

  if (!user) {
    return res.status(500).json({ message: "user not found" });
  }

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

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
