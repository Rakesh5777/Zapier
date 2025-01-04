-- CreateTable
CREATE TABLE "ZapRunOutbox" (
    "id" TEXT NOT NULL,
    "zapRunId" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ZapRunOutbox_pkey" PRIMARY KEY ("id")
);
