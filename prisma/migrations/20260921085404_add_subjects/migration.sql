/*
  Warnings:

  - You are about to drop the column `adviserId` on the `Adviser` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Adviser` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Adviser` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Adviser` table. All the data in the column will be lost.
  - You are about to drop the column `adviserId` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[programId]` on the table `Adviser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Adviser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programId` to the `Adviser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_adviserId_fkey";

-- DropIndex
DROP INDEX "Adviser_adviserId_key";

-- DropIndex
DROP INDEX "Adviser_email_key";

-- AlterTable
ALTER TABLE "Adviser" DROP COLUMN "adviserId",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "programId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "adviserId";

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "units" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "yearlevel" INTEGER NOT NULL,
    "sem" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Adviser_programId_key" ON "Adviser"("programId");

-- AddForeignKey
ALTER TABLE "Adviser" ADD CONSTRAINT "Adviser_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
