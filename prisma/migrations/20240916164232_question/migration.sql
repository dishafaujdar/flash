/*
  Warnings:

  - You are about to drop the column `Answer` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `Question` on the `Cards` table. All the data in the column will be lost.
  - Added the required column `answer` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "Answer",
DROP COLUMN "Question",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "question" TEXT NOT NULL;
