-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "hexAddress" TEXT;

-- AlterTable
ALTER TABLE "tags" ALTER COLUMN "witUuid" DROP NOT NULL;

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "meta" TEXT,
    "contract" TEXT NOT NULL,
    "favId" INTEGER,
    "subId" INTEGER,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_favId_fkey" FOREIGN KEY ("favId") REFERENCES "favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_subId_fkey" FOREIGN KEY ("subId") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
