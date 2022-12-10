/*
  Warnings:

  - You are about to drop the column `hexAddressId` on the `profiles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_hexAddressId_fkey";

-- DropIndex
DROP INDEX "profiles_hexAddressId_key";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "hexAddressId",
ADD COLUMN     "hexAddress" TEXT;
