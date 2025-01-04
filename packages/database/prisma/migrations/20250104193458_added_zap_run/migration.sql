-- CreateTable
CREATE TABLE "ZapRun" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ZapRun_pkey" PRIMARY KEY ("id")
);
