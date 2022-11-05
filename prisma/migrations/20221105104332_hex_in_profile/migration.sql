/*
  Warnings:

  - You are about to drop the column `hexAddress` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hexAddressId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "hexAddress",
ADD COLUMN     "hexAddressId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_hexAddressId_key" ON "profiles"("hexAddressId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_hexAddressId_fkey" FOREIGN KEY ("hexAddressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
