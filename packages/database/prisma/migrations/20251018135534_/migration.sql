/*
  Warnings:

  - You are about to drop the column `expireAt` on the `OtpStore` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OtpStore" DROP COLUMN "expireAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
