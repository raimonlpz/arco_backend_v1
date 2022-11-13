/*
  Warnings:

  - You are about to drop the `NLPEntityDecoded` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NLPIntentDecoded` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NLPTagDecoded` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NLPEntityDecoded" DROP CONSTRAINT "NLPEntityDecoded_nlpEntityId_fkey";

-- DropForeignKey
ALTER TABLE "NLPEntityDecoded" DROP CONSTRAINT "NLPEntityDecoded_profileId_fkey";

-- DropForeignKey
ALTER TABLE "NLPIntentDecoded" DROP CONSTRAINT "NLPIntentDecoded_nlpIntentId_fkey";

-- DropForeignKey
ALTER TABLE "NLPIntentDecoded" DROP CONSTRAINT "NLPIntentDecoded_profileId_fkey";

-- DropForeignKey
ALTER TABLE "NLPTagDecoded" DROP CONSTRAINT "NLPTagDecoded_nlpTagId_fkey";

-- DropForeignKey
ALTER TABLE "NLPTagDecoded" DROP CONSTRAINT "NLPTagDecoded_profileId_fkey";

-- DropForeignKey
ALTER TABLE "_FavToNLPEntityDecoded" DROP CONSTRAINT "_FavToNLPEntityDecoded_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavToNLPIntentDecoded" DROP CONSTRAINT "_FavToNLPIntentDecoded_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavToNLPTagDecoded" DROP CONSTRAINT "_FavToNLPTagDecoded_B_fkey";

-- DropForeignKey
ALTER TABLE "_NLPEntityDecodedToSub" DROP CONSTRAINT "_NLPEntityDecodedToSub_A_fkey";

-- DropForeignKey
ALTER TABLE "_NLPIntentDecodedToSub" DROP CONSTRAINT "_NLPIntentDecodedToSub_A_fkey";

-- DropForeignKey
ALTER TABLE "_NLPTagDecodedToSub" DROP CONSTRAINT "_NLPTagDecodedToSub_A_fkey";

-- DropTable
DROP TABLE "NLPEntityDecoded";

-- DropTable
DROP TABLE "NLPIntentDecoded";

-- DropTable
DROP TABLE "NLPTagDecoded";

-- CreateTable
CREATE TABLE "intents_decoded" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "nlpIntentId" INTEGER NOT NULL,
    "searchId" INTEGER NOT NULL,

    CONSTRAINT "intents_decoded_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entities_decoded" (
    "id" SERIAL NOT NULL,
    "values" TEXT[],
    "nlpEntityId" INTEGER NOT NULL,
    "searchId" INTEGER NOT NULL,

    CONSTRAINT "entities_decoded_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags_decoded" (
    "id" SERIAL NOT NULL,
    "values" TEXT[],
    "nlpTagId" INTEGER NOT NULL,
    "searchId" INTEGER NOT NULL,

    CONSTRAINT "tags_decoded_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "intents_decoded" ADD CONSTRAINT "intents_decoded_nlpIntentId_fkey" FOREIGN KEY ("nlpIntentId") REFERENCES "intents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "intents_decoded" ADD CONSTRAINT "intents_decoded_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "searches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entities_decoded" ADD CONSTRAINT "entities_decoded_nlpEntityId_fkey" FOREIGN KEY ("nlpEntityId") REFERENCES "entities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entities_decoded" ADD CONSTRAINT "entities_decoded_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "searches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_decoded" ADD CONSTRAINT "tags_decoded_nlpTagId_fkey" FOREIGN KEY ("nlpTagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_decoded" ADD CONSTRAINT "tags_decoded_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "searches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPIntentDecoded" ADD CONSTRAINT "_FavToNLPIntentDecoded_B_fkey" FOREIGN KEY ("B") REFERENCES "intents_decoded"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPEntityDecoded" ADD CONSTRAINT "_FavToNLPEntityDecoded_B_fkey" FOREIGN KEY ("B") REFERENCES "entities_decoded"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavToNLPTagDecoded" ADD CONSTRAINT "_FavToNLPTagDecoded_B_fkey" FOREIGN KEY ("B") REFERENCES "tags_decoded"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPIntentDecodedToSub" ADD CONSTRAINT "_NLPIntentDecodedToSub_A_fkey" FOREIGN KEY ("A") REFERENCES "intents_decoded"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPEntityDecodedToSub" ADD CONSTRAINT "_NLPEntityDecodedToSub_A_fkey" FOREIGN KEY ("A") REFERENCES "entities_decoded"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NLPTagDecodedToSub" ADD CONSTRAINT "_NLPTagDecodedToSub_A_fkey" FOREIGN KEY ("A") REFERENCES "tags_decoded"("id") ON DELETE CASCADE ON UPDATE CASCADE;
