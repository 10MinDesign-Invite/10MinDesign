/*
  Warnings:

  - A unique constraint covering the columns `[otp]` on the table `OtpStore` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OtpStore_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "OtpStore_otp_key" ON "OtpStore"("otp");
