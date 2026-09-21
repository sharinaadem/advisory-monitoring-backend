-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "adviserId" INTEGER;

-- CreateTable
CREATE TABLE "Adviser" (
    "id" SERIAL NOT NULL,
    "adviserId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Adviser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrolment" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "academicYear" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enrolment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adviser_adviserId_key" ON "Adviser"("adviserId");

-- CreateIndex
CREATE UNIQUE INDEX "Adviser_email_key" ON "Adviser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Enrolment_studentId_academicYear_semester_key" ON "Enrolment"("studentId", "academicYear", "semester");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_adviserId_fkey" FOREIGN KEY ("adviserId") REFERENCES "Adviser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrolment" ADD CONSTRAINT "Enrolment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
