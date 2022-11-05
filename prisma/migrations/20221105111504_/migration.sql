/*
  Warnings:

  - You are about to drop the column `values` on the `entities` table. All the data in the column will be lost.
  - You are about to drop the column `values` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the `_FavToNLPEntity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavToNLPTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NLPEntityToSub` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NLPTagToSub` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FavToNLPEntity" DROP CONSTRAINT "_FavToNLPEntity_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavToNLPEntity" DROP CONSTRAINT "_FavToNLPEntity_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavToNLPTag" DROP CONSTRAINT "_FavToNLPTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavToNLPTag" DROP CONSTRAINT "_FavToNLPTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_NLPEntityToSub" DROP CONSTRAINT "_NLPEntityToSub_A_fkey";

-- DropForeignKey
ALTER TABLE "_NLPEntityToSub" DROP CONSTRAINT "_NLPEntityToSub_B_fkey";

-- DropForeignKey
ALTER TABLE "_NLPTagToSub" DROP CONSTRAINT "_NLPTagToSub_A_fkey";

-- DropForeignKey
ALTER TABLE "_NLPTagToSub" DROP CONSTRAINT "_NLPTagToSub_B_fkey";

-- AlterTable
ALTER TABLE "entities" DROP COLUMN "values";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "values";

-- DropTable
DROP TABLE "_FavToNLPEntity";

-- DropTable
DROP TABLE "_FavToNLPTag";

-- DropTable
DROP TABLE "_NLPEntityToSub";

-- DropTable
DROP TABLE "_NLPTagToSub";

-- CreateTable
CREATE TABLE "NLPEntityDecoded" (
    "id" SERIAL NOT NULL,
    "values" TEXT[],
    "nlpEntityId" INTEGER NOT NULL,

    CONSTRAINT "NLPEntityDecoded_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NLPTagDecoded" (
    "id" SERIAL NOT NULL,
    "values" TEXT[],
    "nlpTagId" INTEGER NOT NULL,

    CONSTRAINT "NLPTagDecoded_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavToNLPEntityDecoded" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavToNLPTagDecoded" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NLPEntityDecodedToSub" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NLPTagDecodedToSub" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavToNLPEntityDecoded_AB_unique" ON "_FavToNLPEntityDecoded"("A", "B");

-- CreateIndex
CREATE INDEX "_FavToNLPEntityDecoded_B_index" ON "_FavToNLPEntityDecoded"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavToNLPTagDecoded_AB_unique" ON "_FavToNLPTagDecoded"("A", "B");

-- CreateIndex
CREATE INDEX "_FavToNLPTagDecoded_B_index" ON "_FavToNLPTagDecoded"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NLPEntityDecodedToSub_AB_unique" ON "_NLPEntityDecodedToSub"("A", "B");

-- CreateIndex
CREATE INDEX "_NLPEntityDecodedToSub_B_index" ON "_NLPEntityDecodedToSub"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NLPTagDecodedToSub_AB_unique" ON "_NLPTagDecodedToSub"("A", "B");

-- CreateIndex
CREATE INDEX "_NLPTagDecodedToSub_B_index" ON "_NLPTagDecodedToSub"("B");

-- AddForeignKey
ALTER TABLE "NLPEntityDecoded" ADD CONSTRAINT "NLPEntityDecoded_nlpEntityId_fkey" FOREIGN KEY ("nlpEntityId") REFERENCES "entities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NLPTagDecoded" ADD CONSTRAINT "NLPTagDecoded_nlpTagId_fkey" FOREIGN KEY ("nlpTagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPEntityDecoded" ADD CONSTRAINT "_FavToNLPEntityDecoded_A_fkey" FOREIGN KEY ("A") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPEntityDecoded" ADD CONSTRAINT "_FavToNLPEntityDecoded_B_fkey" FOREIGN KEY ("B") REFERENCES "NLPEntityDecoded"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPTagDecoded" ADD CONSTRAINT "_FavToNLPTagDecoded_A_fkey" FOREIGN KEY ("A") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPTagDecoded" ADD CONSTRAINT "_FavToNLPTagDecoded_B_fkey" FOREIGN KEY ("B") REFERENCES "NLPTagDecoded"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPEntityDecodedToSub" ADD CONSTRAINT "_NLPEntityDecodedToSub_A_fkey" FOREIGN KEY ("A") REFERENCES "NLPEntityDecoded"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPEntityDecodedToSub" ADD CONSTRAINT "_NLPEntityDecodedToSub_B_fkey" FOREIGN KEY ("B") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPTagDecodedToSub" ADD CONSTRAINT "_NLPTagDecodedToSub_A_fkey" FOREIGN KEY ("A") REFERENCES "NLPTagDecoded"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPTagDecodedToSub" ADD CONSTRAINT "_NLPTagDecodedToSub_B_fkey" FOREIGN KEY ("B") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
