/*
  Warnings:

  - You are about to drop the column `favId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_favId_fkey";

-- DropIndex
DROP INDEX "users_favId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "favId";

-- CreateTable
CREATE TABLE "FavUsers" (
    "favOfId" INTEGER NOT NULL,
    "favId" INTEGER NOT NULL,

    CONSTRAINT "FavUsers_pkey" PRIMARY KEY ("favOfId","favId")
);

-- AddForeignKey
ALTER TABLE "FavUsers" ADD CONSTRAINT "FavUsers_favOfId_fkey" FOREIGN KEY ("favOfId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavUsers" ADD CONSTRAINT "FavUsers_favId_fkey" FOREIGN KEY ("favId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
