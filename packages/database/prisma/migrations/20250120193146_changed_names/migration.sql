/*
  Warnings:

  - You are about to drop the column `type` on the `Trigger` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "type",
ADD COLUMN     "typeId" TEXT NOT NULL;
