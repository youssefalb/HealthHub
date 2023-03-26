/*
  Warnings:

  - Added the required column `lab_supervisor_id` to the `LaboratoryExamination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LaboratoryExamination" ADD COLUMN     "lab_supervisor_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LaboratoryExamination" ADD CONSTRAINT "LaboratoryExamination_lab_supervisor_id_fkey" FOREIGN KEY ("lab_supervisor_id") REFERENCES "LabSupervisor"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;
