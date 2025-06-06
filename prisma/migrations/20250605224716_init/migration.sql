-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('CLEANING', 'TOWELS', 'LATE_CHECKOUT', 'ROOM_SERVICE', 'MAINTENANCE', 'OTHER');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "requestType" "RequestType" NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "requests_hotelId_idx" ON "requests"("hotelId");

-- CreateIndex
CREATE INDEX "requests_status_idx" ON "requests"("status");
