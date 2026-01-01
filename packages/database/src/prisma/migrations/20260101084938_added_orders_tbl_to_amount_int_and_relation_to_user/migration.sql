/*
  Warnings:

  - You are about to drop the column `username` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `email` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `amount` on the `Orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL,
DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
