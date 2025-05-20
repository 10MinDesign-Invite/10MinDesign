-- CreateTable
CREATE TABLE "OtpStore" (
    "id" SERIAL NOT NULL,
    "otp" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "OtpStore_pkey" PRIMARY KEY ("id")
);
