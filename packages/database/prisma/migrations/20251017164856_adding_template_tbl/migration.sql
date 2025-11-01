-- CreateTable
CREATE TABLE "TemplateWedding" (
    "id" SERIAL NOT NULL,
    "templateId" TEXT NOT NULL,
    "TemplateData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemplateWedding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemplateWedding_templateId_key" ON "TemplateWedding"("templateId");
