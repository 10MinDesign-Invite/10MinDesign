/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `OtpStore` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OtpStore_email_key" ON "OtpStore"("email");
