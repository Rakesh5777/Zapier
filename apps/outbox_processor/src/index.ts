import { prisma } from "@repo/database";
import { Kafka } from "kafkajs";
import { config } from "dotenv";

config(); // load env

const KAFKA_BROKER = process.env.KAFKA_BROKER!;
const KAFKA_TOPIC = process.env.KAFKA_TOPIC!;

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: [KAFKA_BROKER],
});

const producer = kafka.producer();

async function main() {
  await producer.connect();

  while (1) {
    const outbox = await prisma.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });

    await producer.send({
      topic: KAFKA_TOPIC,
      messages: outbox.map((o) => ({
        key: o.id,
        value: o.zapRunId,
      })),
    });

    await prisma.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: outbox.map((o) => o.id),
        },
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

main();
