/*
  Warnings:

  - You are about to drop the column `created_at` on the `requests` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "requests" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
