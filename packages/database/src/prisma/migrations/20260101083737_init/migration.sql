-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "image" TEXT,
    "googleId" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "receipt" TEXT NOT NULL,
    "templateName" TEXT NOT NULL,
    "razorpay_order_id" TEXT NOT NULL,
    "razorpay_payment_id" TEXT NOT NULL,
    "razorpay_signature" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtpStore" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtpStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wedding" (
    "id" SERIAL NOT NULL,
    "componentName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "width" INTEGER,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Wedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateWedding" (
    "id" SERIAL NOT NULL,
    "templateId" TEXT NOT NULL,
    "TemplateData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TemplateWedding_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_googleId_idx" ON "User"("email", "googleId");

-- CreateIndex
CREATE INDEX "User_googleId_idx" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_razorpay_payment_id_key" ON "Orders"("razorpay_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "OtpStore_email_key" ON "OtpStore"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Wedding_componentName_key" ON "Wedding"("componentName");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateWedding_templateId_key" ON "TemplateWedding"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateBirthday_templateId_key" ON "TemplateBirthday"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateRip_templateId_key" ON "TemplateRip"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateOpening_templateId_key" ON "TemplateOpening"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateFestival_templateId_key" ON "TemplateFestival"("templateId");
