/*
  Warnings:

  - Added the required column `currency` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "currency" TEXT NOT NULL;
