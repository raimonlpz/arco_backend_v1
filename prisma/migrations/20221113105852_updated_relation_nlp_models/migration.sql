/*
  Warnings:

  - You are about to drop the `_FavToNLPIntent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NLPIntentToSub` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FavToNLPIntent" DROP CONSTRAINT "_FavToNLPIntent_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavToNLPIntent" DROP CONSTRAINT "_FavToNLPIntent_B_fkey";

-- DropForeignKey
ALTER TABLE "_NLPIntentToSub" DROP CONSTRAINT "_NLPIntentToSub_A_fkey";

-- DropForeignKey
ALTER TABLE "_NLPIntentToSub" DROP CONSTRAINT "_NLPIntentToSub_B_fkey";

-- AlterTable
ALTER TABLE "NLPEntityDecoded" ADD COLUMN     "profileId" INTEGER;

-- AlterTable
ALTER TABLE "NLPTagDecoded" ADD COLUMN     "profileId" INTEGER;

-- DropTable
DROP TABLE "_FavToNLPIntent";

-- DropTable
DROP TABLE "_NLPIntentToSub";

-- CreateTable
CREATE TABLE "NLPIntentDecoded" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "nlpIntentId" INTEGER NOT NULL,
    "profileId" INTEGER,

    CONSTRAINT "NLPIntentDecoded_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavToNLPIntentDecoded" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NLPIntentDecodedToSub" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavToNLPIntentDecoded_AB_unique" ON "_FavToNLPIntentDecoded"("A", "B");

-- CreateIndex
CREATE INDEX "_FavToNLPIntentDecoded_B_index" ON "_FavToNLPIntentDecoded"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NLPIntentDecodedToSub_AB_unique" ON "_NLPIntentDecodedToSub"("A", "B");

-- CreateIndex
CREATE INDEX "_NLPIntentDecodedToSub_B_index" ON "_NLPIntentDecodedToSub"("B");

-- AddForeignKey
ALTER TABLE "NLPIntentDecoded" ADD CONSTRAINT "NLPIntentDecoded_nlpIntentId_fkey" FOREIGN KEY ("nlpIntentId") REFERENCES "intents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NLPIntentDecoded" ADD CONSTRAINT "NLPIntentDecoded_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NLPEntityDecoded" ADD CONSTRAINT "NLPEntityDecoded_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NLPTagDecoded" ADD CONSTRAINT "NLPTagDecoded_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPIntentDecoded" ADD CONSTRAINT "_FavToNLPIntentDecoded_A_fkey" FOREIGN KEY ("A") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPIntentDecoded" ADD CONSTRAINT "_FavToNLPIntentDecoded_B_fkey" FOREIGN KEY ("B") REFERENCES "NLPIntentDecoded"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPIntentDecodedToSub" ADD CONSTRAINT "_NLPIntentDecodedToSub_A_fkey" FOREIGN KEY ("A") REFERENCES "NLPIntentDecoded"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPIntentDecodedToSub" ADD CONSTRAINT "_NLPIntentDecodedToSub_B_fkey" FOREIGN KEY ("B") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
