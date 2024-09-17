/*
  Warnings:

  - You are about to drop the column `Info` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `Cards` table. All the data in the column will be lost.
  - Added the required column `Answer` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Question` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "Info",
DROP COLUMN "Title",
ADD COLUMN     "Answer" TEXT NOT NULL,
ADD COLUMN     "Question" TEXT NOT NULL;
