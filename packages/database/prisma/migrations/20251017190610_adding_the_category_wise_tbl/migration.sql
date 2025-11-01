/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `OtpStore` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `TemplateWedding` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OtpStore" DROP COLUMN "expiresAt";

-- AlterTable
ALTER TABLE "TemplateWedding" DROP COLUMN "expiresAt";

-- CreateTable
CREATE TABLE "TemplateBirthday" (
    "id" SERIAL NOT NULL,
    "templateId" TEXT NOT NULL,
    "TemplateData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TemplateBirthday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateRip" (
    "id" SERIAL NOT NULL,
    "templateId" TEXT NOT NULL,
    "TemplateData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TemplateRip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateOpening" (
    "id" SERIAL NOT NULL,
    "templateId" TEXT NOT NULL,
    "TemplateData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TemplateOpening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateFestival" (
    "id" SERIAL NOT NULL,
    "templateId" TEXT NOT NULL,
    "TemplateData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TemplateFestival_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemplateBirthday_templateId_key" ON "TemplateBirthday"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateRip_templateId_key" ON "TemplateRip"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateOpening_templateId_key" ON "TemplateOpening"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateFestival_templateId_key" ON "TemplateFestival"("templateId");
