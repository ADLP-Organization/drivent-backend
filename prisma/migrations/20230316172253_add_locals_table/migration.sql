/*
  Warnings:

  - Added the required column `localId` to the `Activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activities" ADD COLUMN     "localId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Locals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Locals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "index_data_crescente" ON "Days"("date" DESC);

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Locals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
