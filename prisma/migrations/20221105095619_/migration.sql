/*
  Warnings:

  - You are about to drop the column `favId` on the `searches` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "searches" DROP CONSTRAINT "searches_favId_fkey";

-- DropIndex
DROP INDEX "searches_favId_key";

-- AlterTable
ALTER TABLE "favorites" ADD COLUMN     "searchId" INTEGER;

-- AlterTable
ALTER TABLE "searches" DROP COLUMN "favId";

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "searches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
