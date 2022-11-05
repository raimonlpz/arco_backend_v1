/*
  Warnings:

  - You are about to drop the column `favId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `subId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `favId` on the `entities` table. All the data in the column will be lost.
  - You are about to drop the column `subId` on the `entities` table. All the data in the column will be lost.
  - You are about to drop the column `favId` on the `intents` table. All the data in the column will be lost.
  - You are about to drop the column `subId` on the `intents` table. All the data in the column will be lost.
  - You are about to drop the column `favId` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `subId` on the `tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contract]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[witUuid]` on the table `entities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `entities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[witUuid]` on the table `intents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `intents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[witUuid]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tags` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_favId_fkey";

-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_subId_fkey";

-- DropForeignKey
ALTER TABLE "entities" DROP CONSTRAINT "entities_favId_fkey";

-- DropForeignKey
ALTER TABLE "entities" DROP CONSTRAINT "entities_subId_fkey";

-- DropForeignKey
ALTER TABLE "intents" DROP CONSTRAINT "intents_favId_fkey";

-- DropForeignKey
ALTER TABLE "intents" DROP CONSTRAINT "intents_subId_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_favId_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_subId_fkey";

-- DropIndex
DROP INDEX "intents_favId_key";

-- DropIndex
DROP INDEX "intents_subId_key";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "favId",
DROP COLUMN "subId";

-- AlterTable
ALTER TABLE "entities" DROP COLUMN "favId",
DROP COLUMN "subId";

-- AlterTable
ALTER TABLE "intents" DROP COLUMN "favId",
DROP COLUMN "subId";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "favId",
DROP COLUMN "subId";

-- CreateTable
CREATE TABLE "_FavToNLPIntent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavToNLPEntity" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavToNLPTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavToHexAddress" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NLPIntentToSub" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NLPEntityToSub" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NLPTagToSub" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_HexAddressToSub" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavToNLPIntent_AB_unique" ON "_FavToNLPIntent"("A", "B");

-- CreateIndex
CREATE INDEX "_FavToNLPIntent_B_index" ON "_FavToNLPIntent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavToNLPEntity_AB_unique" ON "_FavToNLPEntity"("A", "B");

-- CreateIndex
CREATE INDEX "_FavToNLPEntity_B_index" ON "_FavToNLPEntity"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavToNLPTag_AB_unique" ON "_FavToNLPTag"("A", "B");

-- CreateIndex
CREATE INDEX "_FavToNLPTag_B_index" ON "_FavToNLPTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavToHexAddress_AB_unique" ON "_FavToHexAddress"("A", "B");

-- CreateIndex
CREATE INDEX "_FavToHexAddress_B_index" ON "_FavToHexAddress"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NLPIntentToSub_AB_unique" ON "_NLPIntentToSub"("A", "B");

-- CreateIndex
CREATE INDEX "_NLPIntentToSub_B_index" ON "_NLPIntentToSub"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NLPEntityToSub_AB_unique" ON "_NLPEntityToSub"("A", "B");

-- CreateIndex
CREATE INDEX "_NLPEntityToSub_B_index" ON "_NLPEntityToSub"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NLPTagToSub_AB_unique" ON "_NLPTagToSub"("A", "B");

-- CreateIndex
CREATE INDEX "_NLPTagToSub_B_index" ON "_NLPTagToSub"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HexAddressToSub_AB_unique" ON "_HexAddressToSub"("A", "B");

-- CreateIndex
CREATE INDEX "_HexAddressToSub_B_index" ON "_HexAddressToSub"("B");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_contract_key" ON "addresses"("contract");

-- CreateIndex
CREATE UNIQUE INDEX "entities_witUuid_key" ON "entities"("witUuid");

-- CreateIndex
CREATE UNIQUE INDEX "entities_name_key" ON "entities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "intents_witUuid_key" ON "intents"("witUuid");

-- CreateIndex
CREATE UNIQUE INDEX "intents_name_key" ON "intents"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_witUuid_key" ON "tags"("witUuid");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "_FavToNLPIntent" ADD CONSTRAINT "_FavToNLPIntent_A_fkey" FOREIGN KEY ("A") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPIntent" ADD CONSTRAINT "_FavToNLPIntent_B_fkey" FOREIGN KEY ("B") REFERENCES "intents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPEntity" ADD CONSTRAINT "_FavToNLPEntity_A_fkey" FOREIGN KEY ("A") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPEntity" ADD CONSTRAINT "_FavToNLPEntity_B_fkey" FOREIGN KEY ("B") REFERENCES "entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPTag" ADD CONSTRAINT "_FavToNLPTag_A_fkey" FOREIGN KEY ("A") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPTag" ADD CONSTRAINT "_FavToNLPTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToHexAddress" ADD CONSTRAINT "_FavToHexAddress_A_fkey" FOREIGN KEY ("A") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToHexAddress" ADD CONSTRAINT "_FavToHexAddress_B_fkey" FOREIGN KEY ("B") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPIntentToSub" ADD CONSTRAINT "_NLPIntentToSub_A_fkey" FOREIGN KEY ("A") REFERENCES "intents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPIntentToSub" ADD CONSTRAINT "_NLPIntentToSub_B_fkey" FOREIGN KEY ("B") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPEntityToSub" ADD CONSTRAINT "_NLPEntityToSub_A_fkey" FOREIGN KEY ("A") REFERENCES "entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPEntityToSub" ADD CONSTRAINT "_NLPEntityToSub_B_fkey" FOREIGN KEY ("B") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPTagToSub" ADD CONSTRAINT "_NLPTagToSub_A_fkey" FOREIGN KEY ("A") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPTagToSub" ADD CONSTRAINT "_NLPTagToSub_B_fkey" FOREIGN KEY ("B") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HexAddressToSub" ADD CONSTRAINT "_HexAddressToSub_A_fkey" FOREIGN KEY ("A") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HexAddressToSub" ADD CONSTRAINT "_HexAddressToSub_B_fkey" FOREIGN KEY ("B") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
