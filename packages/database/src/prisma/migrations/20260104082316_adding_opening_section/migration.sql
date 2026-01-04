-- CreateTable
CREATE TABLE "Opening" (
    "id" SERIAL NOT NULL,
    "componentName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "width" INTEGER,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Opening_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Opening_componentName_key" ON "Opening"("componentName");
