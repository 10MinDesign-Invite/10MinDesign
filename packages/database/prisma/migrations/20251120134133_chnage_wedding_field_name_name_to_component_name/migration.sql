/*
  Warnings:

  - You are about to drop the column `name` on the `Wedding` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[componentName]` on the table `Wedding` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `componentName` to the `Wedding` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Wedding_name_key";

-- AlterTable
ALTER TABLE "Wedding" DROP COLUMN "name",
ADD COLUMN     "componentName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Wedding_componentName_key" ON "Wedding"("componentName");
