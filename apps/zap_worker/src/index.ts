import { Prisma } from "@prisma/client";
import { config } from "dotenv";
import { Kafka } from "kafkajs";

config(); // load env

const KAFKA_BROKER = process.env.KAFKA_BROKER!;
const KAFKA_TOPIC = process.env.KAFKA_TOPIC!;

const kafka = new Kafka({
  clientId: "zap-worker",
  brokers: [KAFKA_BROKER],
});

async function main() {
  const consumer = kafka.consumer({ groupId: "zap-worker" });
  await consumer.connect();
  await consumer.subscribe({ topic: KAFKA_TOPIC });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value?.toString();
      const offset = message.offset;
      console.log({ partition, offset, value });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("processing done");

      await consumer.commitOffsets([
        { topic, partition, offset: +message.offset + 1 + "" }, // commit offset to next message
      ]);
    },
  });
}

main();
